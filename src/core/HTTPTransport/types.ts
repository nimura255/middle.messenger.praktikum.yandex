export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

export type ResponseError = {
  code: number;
  response: IndexedObject;
  responseText: string;
};

export type Response<Data> = {
  code: number;
  data: Data;
  dataText: string;
};

export type RequestOptions = {
  data?: Record<string, string> | FormData;
  timeout?: number;
  method?: HTTPMethod;
  headers?: Record<string, string>;
};
