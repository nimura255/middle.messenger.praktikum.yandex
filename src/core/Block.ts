import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';
import { EventBus } from './EventBus';

type UnknownObject = Record<string, unknown>;

export type BaseProps = UnknownObject & {
  events?: {
    click?: (event: MouseEvent) => void;
  };
  children?: Record<string, Block>;
};

type BlockMeta<Props = BaseProps> = {
  props: Props;
  tagName: string;
};
type LifecycleEvents = Values<typeof Block.LIFECYCLE_EVENTS>;
type EventBusOfBlock<Props = BaseProps> = EventBus<
  LifecycleEvents,
  {
    [Block.LIFECYCLE_EVENTS.INIT]: [void];
    [Block.LIFECYCLE_EVENTS.COMPONENT_DID_MOUNT]: [Props];
    [Block.LIFECYCLE_EVENTS.COMPONENT_DID_UPDATE]: [Props, Props];
    [Block.LIFECYCLE_EVENTS.RENDER]: [void];
  }
>;
export class Block<
  Props extends BaseProps = BaseProps,
  State extends Record<string, unknown> = Record<string, unknown>
> {
  static readonly LIFECYCLE_EVENTS = {
    INIT: 'lifecycle:init',
    COMPONENT_DID_MOUNT: 'lifecycle:component-did-mount',
    COMPONENT_DID_UPDATE: 'lifecycle:component-did-update',
    RENDER: 'lifecycle:render',
  } as const;

  private readonly meta: BlockMeta<Props>;
  private wrapperElement: Nullable<HTMLElement> = null;
  protected props: Props;
  protected state = {} as State;
  protected children: Record<string, Block<Props, State>> | undefined;
  protected id = nanoid(6);
  private eventBus: () => EventBusOfBlock<Props>;

  constructor(tagName = 'div', props: Props = {} as Props) {
    const eventBus =
      new EventBus<LifecycleEvents>() as EventBusOfBlock<Props>;
    const { children, propsWithoutChildren } =
      this.separateChildrenAndProps(props);
    this.meta = {
      tagName,
      props: propsWithoutChildren,
    };
    this.children = children;
    this.props = this.makeDependencyDataProxy(propsWithoutChildren);
    this.eventBus = () => eventBus;
    this.registerLifecycleEvents(eventBus);
    eventBus.emit(Block.LIFECYCLE_EVENTS.INIT);
  }

  private registerLifecycleEvents(eventBus: EventBusOfBlock<Props>) {
    eventBus.on(Block.LIFECYCLE_EVENTS.INIT, this.init.bind(this));
    eventBus.on(
      Block.LIFECYCLE_EVENTS.COMPONENT_DID_MOUNT,
      this.innerComponentDidMount.bind(this)
    );
    eventBus.on(
      Block.LIFECYCLE_EVENTS.COMPONENT_DID_UPDATE,
      this.innerComponentDidUpdate.bind(this)
    );
    eventBus.on(
      Block.LIFECYCLE_EVENTS.RENDER,
      this.innerRender.bind(this)
    );
  }

  private createResources() {
    const { tagName } = this.meta;
    this.wrapperElement = this.createDocumentElement(tagName);
  }

  private init() {
    this.createResources();
    this.eventBus().emit(Block.LIFECYCLE_EVENTS.RENDER);
  }

  private innerComponentDidMount(props: Props) {
    this.componentDidMount(props);

    if (this.children) {
      Object.values(this.children).forEach((child) => {
        child.dispatchComponentDidMount();
      });
    }
  }

  componentDidMount(_props: Props) {
    //
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(
      Block.LIFECYCLE_EVENTS.COMPONENT_DID_MOUNT,
      this.props
    );
  }

  private innerComponentDidUpdate(oldProps: Props, newProps: Props) {
    this.componentDidUpdate(oldProps, newProps);
    this.eventBus().emit(Block.LIFECYCLE_EVENTS.RENDER);
  }

  componentDidUpdate(_oldProps: Props, _newProps: Props) {
    //
  }

  setState = (nextState: State) => {
    Object.assign(this.state, nextState);
  };

  setProps = (nextProps?: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this.wrapperElement;
  }

  private innerRender() {
    if (!this.wrapperElement) {
      return;
    }
    const block = this.compile(this.render());

    this.removeEvents();
    this.wrapperElement.innerHTML = '';
    this.wrapperElement.appendChild(block);
    this.addEvents();
  }

  render() {
    return '';
  }

  getContent(): Nullable<HTMLElement> {
    return this.element;
  }

  private makeDependencyDataProxy = <
    Data extends Record<string, unknown> = Record<string, unknown>
  >(
    data: Data
  ): Data => {
    const get = (target: Data, propertyKey: string) => {
      const value = target[propertyKey];

      return typeof value === 'function' ? value.bind(target) : value;
    };

    const set = (
      target: Record<string, unknown>,
      propertyKey: string,
      value: unknown
    ) => {
      const prevProps = { ...this.props } as Props;
      target[propertyKey] = value;
      const newProps = { ...this.props } as Props;

      // Запускаем обновление компоненты
      // Плохой cloneDeep, в след итерации нужно заставлять добавлять cloneDeep им самим
      this.eventBus().emit(
        Block.LIFECYCLE_EVENTS.COMPONENT_DID_UPDATE,
        prevProps,
        newProps
      );

      return true;
    };

    return new Proxy(data, { get, set }) as Data;
  };

  private createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  private addEvents = () => {
    const { events = {} } = this.props;
    const element = this.element;

    if (!element) {
      return;
    }

    const eventNames = Object.keys(events) as Array<keyof typeof events>;

    eventNames.forEach((eventName) => {
      const handler = events[eventName];

      if (handler) {
        element.addEventListener(eventName, handler);
      }
    });
  };

  private removeEvents = () => {
    const { events = {} } = this.props;
    const element = this.element;

    if (!element) {
      return;
    }

    const eventNames = Object.keys(events) as Array<keyof typeof events>;

    eventNames.forEach((eventName) => {
      const handler = events[eventName];

      if (handler) {
        element.removeEventListener(eventName, handler);
      }
    });
  };

  private separateChildrenAndProps = (
    props: Props
  ): {
    children?: Record<string, Block<Props, State>>;
    propsWithoutChildren: Props;
  } => {
    const { children, ...propsWithoutChildren } = props;

    return {
      children: children as Record<string, Block<Props, State>>,
      propsWithoutChildren: propsWithoutChildren as Props,
    };
  };

  private compile = (template: string) => {
    const stubs = {} as Record<string, string>;
    const childrenTuples = Object.entries(this.children || {});

    childrenTuples.forEach(([key, child]) => {
      stubs[key] = `<div data-id="${child.id}"></div>`;
    });

    const fragment = this.createDocumentElement(
      'template'
    ) as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(template)({
      ...this.props,
      ...stubs,
    });

    childrenTuples.forEach(([_, child]) => {
      const stub = fragment.content.querySelector(
        `[data-id="${child.id}"]`
      );
      const childContent = child.getContent();

      if (childContent && stub) {
        stub.replaceWith(childContent);
      }
    });

    return fragment.content;
  };

  show = () => {
    const blockContent = this.getContent();

    if (blockContent) {
      blockContent.style.display = 'block';
    }
  };

  hide() {
    const blockContent = this.getContent();

    if (blockContent) {
      blockContent.style.display = 'none';
    }
  }
}
