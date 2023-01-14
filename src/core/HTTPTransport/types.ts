export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

export type ResponseError = {
  code: number;
  response: object;
  responseText: string;
};
