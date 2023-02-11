import { Block, type BaseProps } from './Block';

class MockComponent extends Block {
  static mockComponentDidMount = jest.fn();
  static mockComponentDidUpdate = jest.fn();
  static mockComponentWillUnmount = jest.fn();

  constructor() {
    super({}, {});
  }

  componentDidMount(props: BaseProps) {
    MockComponent.mockComponentDidMount(props);
  }

  componentDidUpdate(oldProps: BaseProps, newProps: BaseProps) {
    MockComponent.mockComponentDidUpdate(oldProps, newProps);
  }

  componentWillUnmount() {
    MockComponent.mockComponentWillUnmount();
  }

  render() {
    return '<h1>Mock Component</h1>';
  }
}

class MockComponentSecond extends Block {
  static mockComponentDidUpdate = jest.fn();

  constructor() {
    super({}, {});
  }

  render() {
    return '<h2>Mock Component Second</h2>';
  }
}

class ParentMockComponent extends Block {
  constructor() {
    const childComponent = new MockComponent();

    super(
      {
        children: { slot: childComponent },
      },
      {}
    );
  }

  render() {
    return '<div>{{{slot}}}</div>';
  }
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('core/Block', () => {
  it('Renders HTML', () => {
    const block = new MockComponent();

    const content = block.getContent();

    expect(content?.outerHTML).toBe('<h1>Mock Component</h1>');
  });

  it('Dispatches componentDidMount once after calling dispatchComponentDidMount()', () => {
    const block = new MockComponent();

    block.dispatchComponentDidMount();

    expect(MockComponent.mockComponentDidMount).toBeCalledTimes(1);
  });

  it('Dispatches componentDidUpdate once after setting new props', () => {
    const block = new MockComponent();

    block.setProp('some-prop', 1);

    expect(MockComponent.mockComponentDidUpdate).toBeCalledTimes(1);
  });

  it('Allows to set props with setProp()', () => {
    const block = new MockComponent();

    block.setProp('some-prop', 1);

    const newProps = MockComponent.mockComponentDidUpdate.mock.calls[0][1];

    expect(newProps).toStrictEqual({ 'some-prop': 1 });
  });

  it('Allows to set props with setProps()', () => {
    const block = new MockComponent();

    block.setProps({ 'some-prop': 1 });

    const newProps = MockComponent.mockComponentDidUpdate.mock.calls[0][1];

    expect(newProps).toStrictEqual({ 'some-prop': 1 });
  });

  it('Allows to set children with setProp()', () => {
    const block = new ParentMockComponent();
    const child = new MockComponentSecond();
    const expectedHTML = '<div><h2>Mock Component Second</h2></div>';

    block.setProp('children', { slot: child });
    const blockContent = block.getContent();

    expect(blockContent?.outerHTML).toBe(expectedHTML);
  });

  it('Allows to set children with setProps()', async () => {
    const block = new ParentMockComponent();
    const child = new MockComponentSecond();
    const expectedHTML = '<div><h2>Mock Component Second</h2></div>';

    block.setProps({ children: { slot: child } });

    const blockContent = block.getContent();

    expect(blockContent?.outerHTML).toBe(expectedHTML);
  });

  it('Can render with children', async () => {
    const block = new ParentMockComponent();
    const expectedHTML = '<div><h1>Mock Component</h1></div>';

    const content = block.element;

    expect(content?.outerHTML).toBe(expectedHTML);
  });

  it("Dispatches children's componentDidMount", () => {
    new ParentMockComponent();

    expect(MockComponent.mockComponentDidMount).toBeCalledTimes(1);
  });

  it('Dispatches componentWillUnmount for removed child', () => {
    const block = new ParentMockComponent();

    block.setProp('children', {});

    expect(MockComponent.mockComponentWillUnmount).toBeCalled();
  });

  it('Dispatches componentWillUnmount for children when block itself will be unmounted', () => {
    const block = new ParentMockComponent();

    block.dispatchComponentWillUnmount();
    block.dispatchComponentWillUnmount();

    expect(MockComponent.mockComponentWillUnmount).toBeCalled();
  });
});
