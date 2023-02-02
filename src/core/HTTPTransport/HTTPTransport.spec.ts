import { apiRoot } from '$constants/apiRoots';
import { HTTPTransport } from './HTTPTransport';

type XMLHttpRequestInterface = typeof XMLHttpRequest;

const mockGetRequest = jest.fn();
const mockPostRequest = jest.fn();
const mockPutRequest = jest.fn();
const mockDeleteRequest = jest.fn();
const mockSetRequestHeader = jest.fn();
const trueXMLHttpRequest = window.XMLHttpRequest;

class XMLHttpRequestMock {
  method = '';
  url = '';
  timeout: number | undefined;
  withCredentials = false;
  status = 200;
  response: unknown;
  responseText = '';
  headers: Record<string, string> = {};

  constructor(params?: { status?: number }) {
    this.status = params?.status || 200;
  }

  open(method: string, url: string) {
    this.method = method;
    this.url = url;
  }

  setRequestHeader(key: string, value: string) {
    this.headers[key] = value;
    mockSetRequestHeader(key, value);
  }

  send(data?: string | FormData) {
    let requestMock: jest.Mock | undefined;

    switch (this.method) {
      case 'GET':
        requestMock = mockGetRequest;
        break;
      case 'POST':
        requestMock = mockPostRequest;
        break;
      case 'PUT':
        requestMock = mockPutRequest;
        break;
      case 'DELETE':
        requestMock = mockDeleteRequest;
        break;
      default:
      //
    }

    if (data) {
      requestMock?.(this.url, data);
    } else {
      requestMock?.(this.url);
    }

    this.onload();
  }

  onload() {
    /**/
  }
  onabort() {
    /**/
  }
  ontimeout() {
    /**/
  }
}

function setupXMLHttpRequestMock(params?: { status?: number }) {
  window.XMLHttpRequest = jest.fn(
    () => new XMLHttpRequestMock(params)
  ) as unknown as XMLHttpRequestInterface;
}

beforeEach(() => {
  setupXMLHttpRequestMock();
});

afterAll(() => {
  window.XMLHttpRequest = trueXMLHttpRequest;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('core/HTTPTransport', () => {
  it('Allows to make GET requests', async () => {
    const transport = new HTTPTransport('');

    await transport.get('/root');

    expect(mockGetRequest).toBeCalledTimes(1);
  });

  it('Allows to make POST requests', async () => {
    const transport = new HTTPTransport('');

    await transport.post('/root');

    expect(mockPostRequest).toBeCalledTimes(1);
  });

  it('Allows to make PUT requests', async () => {
    const transport = new HTTPTransport('');

    await transport.put('/root');

    expect(mockPutRequest).toBeCalledTimes(1);
  });

  it('Allows to make DELETE requests', async () => {
    const transport = new HTTPTransport('');

    await transport.delete('/root');

    expect(mockDeleteRequest).toBeCalledTimes(1);
  });

  it('Allows to define endpoints prefix', async () => {
    const somePrefix = 'some-prefix-path';
    const route = 'some-endpoint-route';
    const transport = new HTTPTransport(somePrefix);
    const expectedRequestUrl = `${apiRoot}/${somePrefix}/${route}`;

    await transport.get(route);

    expect(mockGetRequest).toBeCalledWith(expectedRequestUrl);
  });

  it('Allows to define headers', async () => {
    const transport = new HTTPTransport();

    await transport.get('', { headers: { 'header-key': 'header-value' } });

    expect(mockSetRequestHeader).toBeCalledWith(
      'header-key',
      'header-value'
    );
  });

  it('Makes query string from data object passed to GET method', async () => {
    const transport = new HTTPTransport();
    const route = 'route';
    const data = { first: '1', second: '2' };
    const expectedQuery = '?first=1&second=2';

    await transport.get(route, { data });

    expect(mockGetRequest).toBeCalledWith(
      `${apiRoot}/${route}${expectedQuery}`
    );
  });

  it('Rejects returned promise if request resolves with 4XX', async () => {
    setupXMLHttpRequestMock({ status: 403 });
    const transport = new HTTPTransport();

    const promise = transport.get('');

    await expect(promise).rejects.toHaveProperty('code', 403);
  });

  it('Rejects returned promise if request resolves with 5XX', async () => {
    setupXMLHttpRequestMock({ status: 504 });
    const transport = new HTTPTransport();

    const promise = transport.get('');

    await expect(promise).rejects.toHaveProperty('code', 504);
  });

  it('Resolves returned promise request with other statuses', async () => {
    const transport = new HTTPTransport();

    const promise = transport.get('');

    await expect(promise).resolves.toHaveProperty('code', 200);
  });

  it('Sends FormData as it is', async () => {
    const formData = new FormData();
    const transport = new HTTPTransport();

    await transport.post('', { data: formData });

    expect(mockPostRequest).toBeCalledWith(`${apiRoot}`, formData);
  });

  it('Sends object data as JSON string', async () => {
    const data = { first: '1', second: '2' };
    const stringifiedData = JSON.stringify(data);
    const transport = new HTTPTransport();

    await transport.post('', { data });

    expect(mockSetRequestHeader).toBeCalledWith(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    expect(mockPostRequest).toBeCalledWith(`${apiRoot}`, stringifiedData);
  });
});
