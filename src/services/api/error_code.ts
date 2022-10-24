export enum HttpErrorCode {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  MethodNotAllowed = 405,
  InternalServerError = 500,
}

export enum ErrorCode {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  MethodNotAllowed = 405,
  InternalServerError = 500,
  HasNotPackage = 1000,
  HasPackageOver = 1001,
  HasPackageExpired = 1002,
  RoleNotFound = 1003,
  RoleFeatureNotFound = 1004,
  WebsiteNotFound = 9999,
}
