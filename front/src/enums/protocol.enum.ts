export enum HttpMethod {
  HTTP = 'http',
  HTTPS = 'https',
}

export enum ApiMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export enum ApiHeader {
  CONTENT_TYPE = 'Content-Type',
  APPLICATION_JSON = 'application/json',
  ACCEPT = 'Accept',
  AUTHORIZATION = 'Authorization',
  USER_AGENT = 'User-Agent',
  URL_ENCODED = 'application/x-www-form-urlencoded',
}

export enum ApiResponseCode {
  OK = 'OK',
}
