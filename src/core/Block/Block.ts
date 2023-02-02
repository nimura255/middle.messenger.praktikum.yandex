import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';
import { EventBus } from '$core/EventBus';

type UnknownObject = Record<string, unknown>;
export type BlockRef = { current: Block | null };

export type BaseProps = UnknownObject & {
  events?: {
    click?: (event: MouseEvent) => void;
    submit?: (event: SubmitEvent) => void;
    focusout?: (event: FocusEvent) => void;
    input?: (event: InputEvent) => void;
    change?: (event: InputEvent) => void;
    scroll?: (event: Event) => void;
  };
  children?: Record<string, Block>;
  ref?: BlockRef;
};

type BlockMeta = {
  tagName: string;
  className?: string;
};
type LifecycleEvents = Values<typeof Block.LIFECYCLE_EVENTS>;
type EventBusOfBlock<Props = BaseProps> = EventBus<
  LifecycleEvents,
  {
    [Block.LIFECYCLE_EVENTS.INIT]: [void];
    [Block.LIFECYCLE_EVENTS.COMPONENT_DID_MOUNT]: [Props];
    [Block.LIFECYCLE_EVENTS.COMPONENT_DID_UPDATE]: [Props, Props];
    [Block.LIFECYCLE_EVENTS.RENDER]: [void];
    [Block.LIFECYCLE_EVENTS.COMPONENT_WILL_UNMOUNT]: [void];
  }
>;

type BlockWrapperParams = {
  tagName?: string;
  className?: string;
};

export class Block<
  Props extends BaseProps = BaseProps,
  State extends Record<string, unknown> = Record<string, unknown>
> {
  static readonly LIFECYCLE_EVENTS = {
    INIT: 'lifecycle:init',
    COMPONENT_DID_MOUNT: 'lifecycle:component-did-mount',
    COMPONENT_DID_UPDATE: 'lifecycle:component-did-update',
    COMPONENT_WILL_UNMOUNT: 'lifecycle:component-will-unmount',
    RENDER: 'lifecycle:render',
  } as const;

  private readonly meta: BlockMeta;
  private wrapperElement: Nullable<HTMLElement> = null;
  protected props: Props;
  protected state = {} as State;
  protected children: Record<string, Block<Props, State>> | undefined;
  private mountedChildren: Record<string, Block<Props, State>> = {};
  protected id = nanoid(6);
  private eventBus: () => EventBusOfBlock<Props>;

  constructor(
    props: Props = {} as Props,
    wrapperParams: BlockWrapperParams
  ) {
    const { tagName = 'div', className } = wrapperParams;

    const eventBus =
      new EventBus<LifecycleEvents>() as EventBusOfBlock<Props>;
    const { children, propsWithoutChildren } =
      this.separateChildrenAndProps(props);
    this.meta = {
      tagName,
      className,
    };
    this.setChildren(children);
    this.props = this.makeDependencyDataProxy(propsWithoutChildren);
    this.state = this.makeDependencyDataProxy({} as State);
    this.eventBus = () => eventBus;
    this.registerLifecycleEvents(eventBus);
    eventBus.emit(Block.LIFECYCLE_EVENTS.INIT);

    if (props.ref) {
      props.ref.current = this as Block;
    }
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
      Block.LIFECYCLE_EVENTS.COMPONENT_WILL_UNMOUNT,
      this.innerComponentWillUnmount.bind(this)
    );
    eventBus.on(
      Block.LIFECYCLE_EVENTS.RENDER,
      this.innerRender.bind(this)
    );
  }

  private createResources() {
    const { tagName, className } = this.meta;
    this.wrapperElement = this.createDocumentElement(tagName, className);
  }

  private init() {
    this.createResources();
    this.eventBus().emit(Block.LIFECYCLE_EVENTS.RENDER);
  }

  private innerComponentDidMount(props: Props) {
    this.componentDidMount(props);
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

  private innerComponentWillUnmount() {
    this.componentWillUnmount();

    if (this.children) {
      Object.values(this.children).forEach((child) => {
        child.dispatchComponentWillUnmount();
      });
    }
  }

  componentWillUnmount() {
    //
  }

  dispatchComponentWillUnmount() {
    this.eventBus().emit(Block.LIFECYCLE_EVENTS.COMPONENT_WILL_UNMOUNT);
  }

  private innerComponentDidUpdate(oldProps: Props, newProps: Props) {
    this.eventBus().emit(Block.LIFECYCLE_EVENTS.RENDER);
    this.componentDidUpdate(oldProps, newProps);
  }

  componentDidUpdate(_oldProps: Props, _newProps: Props) {
    //
  }

  setState = (nextState: State) => {
    Object.assign(this.state, nextState);
  };

  setProps(nextProps?: Props): void;
  setProps(updateCB: (oldProps: Props) => Props): void;

  setProps(arg: unknown) {
    let nextProps: Props | undefined;

    if (typeof arg === 'function') {
      nextProps = arg(this.props);
    } else {
      nextProps = arg as Props;
    }

    if (!nextProps) {
      return;
    }

    const { children } = this.separateChildrenAndProps(nextProps);

    if (children) {
      this.setChildren(children);
    }

    Object.assign(this.props, nextProps);
  }

  setProp<K extends keyof Props, V extends Props[K]>(key: K, value: V) {
    if (key === 'children') {
      this.setChildren(value as typeof this.children);
    }

    this.props[key] = value;
  }

  private dispatchUnmountForRemovedChildren() {
    for (const childKey in this.mountedChildren) {
      if (
        !this.children ||
        !this.children[childKey] ||
        this.children[childKey] !== this.mountedChildren[childKey]
      ) {
        this.mountedChildren[childKey].dispatchComponentWillUnmount();
        delete this.mountedChildren[childKey];
      }
    }
  }

  private dispatchMountForNewChildren() {
    for (const childKey in this.children) {
      if (
        !this.mountedChildren ||
        !this.mountedChildren[childKey] ||
        this.children[childKey] !== this.mountedChildren[childKey]
      ) {
        this.children[childKey].dispatchComponentDidMount();
        this.mountedChildren[childKey] = this.children[childKey];
      }
    }
  }

  private setChildren(
    children: Record<string, Block<Props, State>> | undefined
  ) {
    this.children = children;
  }

  get element() {
    return this.wrapperElement;
  }

  private innerRender() {
    this.dispatchUnmountForRemovedChildren();

    if (!this.wrapperElement) {
      return;
    }

    this.removeEvents();

    const block = this.compile(this.render());

    if (!block.childElementCount) {
      return;
    }

    const elementToInsert = block.children[0] as unknown as HTMLElement;

    this.wrapperElement.replaceWith(elementToInsert);
    this.wrapperElement = elementToInsert;

    this.dispatchMountForNewChildren();
    this.addEvents();
  }

  render() {
    return '';
  }

  getContent(): Nullable<HTMLElement> {
    return this.element;
  }

  private makeDependencyDataProxy = <Data extends State | Props>(
    data: Data
  ): Data => {
    const get = (target: Data, propertyKey: string) => {
      const value = target[propertyKey];

      return typeof value === 'function' ? value.bind(target) : value;
    };

    const set = (target: Data, propertyKey: string, value: unknown) => {
      if (target[propertyKey] !== value) {
        const prevProps = { ...this.props };
        target[propertyKey] = value;
        const newProps = { ...this.props };

        this.eventBus().emit(
          Block.LIFECYCLE_EVENTS.COMPONENT_DID_UPDATE,
          prevProps,
          newProps
        );
      }

      return true;
    };

    return new Proxy(data, { get, set });
  };

  private createDocumentElement(tagName: string, className?: string) {
    const element = document.createElement(tagName);

    if (className) {
      element.className = className;
    }

    return element;
  }

  private addEvents = () => {
    const { events = {} } = this.props;
    const element = this.element;

    if (!element) {
      return;
    }

    const eventNames = Object.keys(events) as Array<keyof typeof events>;

    eventNames.forEach((eventName) => {
      const handler = events[
        eventName
      ] as EventListenerOrEventListenerObject;

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
      const handler = events[
        eventName
      ] as EventListenerOrEventListenerObject;

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

      if (child.element && stub) {
        stub.replaceWith(child.element);
      }
    });

    return fragment.content;
  };
}
