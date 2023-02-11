import { apiRoot } from '$constants/apiRoots';
import { isObject } from '$utils/objects';
import { urlJoin } from '$utils/url';
import { parseResponse, queryStringify } from './utils';
import { HTTPMethod, type Response, type RequestOptions } from './types';

export class HTTPTransport {
  private readonly baseUrl: string;

  constructor(routePrefix = '') {
    this.baseUrl = urlJoin(apiRoot, routePrefix);
  }

  get = <Data>(route: string, options: RequestOptions = {}) => {
    const { data, timeout } = options;
    let routeWithParams = route;

    if (data && isObject(data)) {
      routeWithParams =
        route + queryStringify(data as IndexedObject<string>);
    }

    return this.request<Data>(
      routeWithParams,
      { ...options, method: HTTPMethod.GET },
      timeout
    );
  };

  post = <Data>(route: string, options: RequestOptions = {}) => {
    return this.request<Data>(
      route,
      { ...options, method: HTTPMethod.POST },
      options.timeout
    );
  };

  put = <Data>(route: string, options: RequestOptions = {}) => {
    return this.request<Data>(
      route,
      { ...options, method: HTTPMethod.PUT },
      options.timeout
    );
  };

  delete = <Data>(route: string, options: RequestOptions = {}) => {
    return this.request<Data>(
      route,
      { ...options, method: HTTPMethod.DELETE },
      options.timeout
    );
  };

  private request = <Data>(
    route: string,
    options: RequestOptions = {},
    timeout = 5000
  ): Promise<Response<Data>> => {
    const url = urlJoin(this.baseUrl, route);
    const { method = HTTPMethod.GET, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.timeout = timeout;

      xhr.onload = function () {
        const stringStatus = `${xhr.status}`;
        const responseData = {
          code: xhr.status,
          data: parseResponse(xhr.response || '{}'),
          dataText: xhr.responseText || '',
        };

        if (stringStatus.startsWith('4') || stringStatus.startsWith('5')) {
          reject(responseData);
        } else {
          resolve(responseData);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.withCredentials = true;

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      if (method === HTTPMethod.GET || !data) {
        xhr.send();
      } else {
        if (data instanceof FormData) {
          xhr.send(data);
        } else if (isObject(data)) {
          xhr.setRequestHeader(
            'Content-Type',
            'application/json; charset=utf-8'
          );
          xhr.send(JSON.stringify(data));
        } else {
          xhr.setRequestHeader(
            'Content-Type',
            'text/plain; charset=utf-8'
          );
          xhr.send(data as unknown as string);
        }
      }
    });
  };
}
