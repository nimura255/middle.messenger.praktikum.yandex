import { queryStringify } from './utils';
import { HTTPMethod } from './types';

type RequestOptions = {
  data?: Record<string, string>;
  timeout?: number;
  method?: HTTPMethod;
  headers?: Record<string, string>;
};

export class HTTPTransport {
  get = (url: string, options: RequestOptions = {}) => {
    const { data, timeout } = options;
    let urlWithParams = url;

    if (data) {
      urlWithParams = url + queryStringify(data);
    }

    return this.request(
      urlWithParams,
      { ...options, method: HTTPMethod.GET },
      timeout
    );
  };

  post = (url: string, options: RequestOptions = {}) => {
    return this.request(
      url,
      { ...options, method: HTTPMethod.POST },
      options.timeout
    );
  };

  put = (url: string, options: RequestOptions = {}) => {
    return this.request(
      url,
      { ...options, method: HTTPMethod.PUT },
      options.timeout
    );
  };

  delete = (url: string, options: RequestOptions = {}) => {
    return this.request(
      url,
      { ...options, method: HTTPMethod.DELETE },
      options.timeout
    );
  };

  // PUT, POST, DELETE

  // options:
  // headers — obj
  // data — obj
  request = (
    url: string,
    options: RequestOptions = {},
    timeout = 5000
  ) => {
    const { method = HTTPMethod.GET, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.timeout = timeout;

      xhr.onload = function () {
        const stringStatus = `${xhr.status}`;

        if (stringStatus.startsWith('4') || stringStatus.startsWith('5')) {
          reject(xhr);
        } else {
          resolve(xhr);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      if (method === HTTPMethod.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data as unknown as XMLHttpRequestBodyInit);
      }
    });
  };
}
