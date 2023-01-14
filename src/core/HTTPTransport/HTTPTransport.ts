import { isObject } from '$utils/objects';
import { urlJoin } from '$utils/url';
import { queryStringify } from './utils';
import { HTTPMethod } from './types';

type RequestOptions = {
  data?: Record<string, string>;
  timeout?: number;
  method?: HTTPMethod;
  headers?: Record<string, string>;
};

export class HTTPTransport {
  private readonly baseUrl: string;

  constructor(routePrefix: string) {
    this.baseUrl = urlJoin(process.env.API_ROOT || '', routePrefix);
  }

  get = <Response>(
    route: string,
    options: RequestOptions = {}
  ): Promise<Response> => {
    const { data, timeout } = options;
    let routeWithParams = route;

    if (data) {
      routeWithParams = route + queryStringify(data);
    }

    return this.request(
      routeWithParams,
      { ...options, method: HTTPMethod.GET },
      timeout
    );
  };

  post = <Response>(
    route: string,
    options: RequestOptions = {}
  ): Promise<Response> => {
    return this.request(
      route,
      { ...options, method: HTTPMethod.POST },
      options.timeout
    );
  };

  put = <Response>(
    route: string,
    options: RequestOptions = {}
  ): Promise<Response> => {
    return this.request(
      route,
      { ...options, method: HTTPMethod.PUT },
      options.timeout
    );
  };

  delete = <Response>(
    route: string,
    options: RequestOptions = {}
  ): Promise<Response> => {
    return this.request(
      route,
      { ...options, method: HTTPMethod.DELETE },
      options.timeout
    );
  };

  request = <Response>(
    route: string,
    options: RequestOptions = {},
    timeout = 5000
  ): Promise<Response> => {
    const url = urlJoin(this.baseUrl, route);
    const { method = HTTPMethod.GET, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.timeout = timeout;

      xhr.onload = function () {
        const stringStatus = `${xhr.status}`;

        if (stringStatus.startsWith('4') || stringStatus.startsWith('5')) {
          reject({
            code: xhr.status,
            response: JSON.parse(xhr.response || '{}'),
            responseText: xhr.responseText || '',
          });
        } else {
          resolve(xhr as Response);
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
          xhr.setRequestHeader('Content-Type', 'multipart/form-data');
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
