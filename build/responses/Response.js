"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const response = (responseObject, statusCode, dataOrError) => {
  const res = responseObject;
  let x;

  if (statusCode >= 400) {
    x = 'error';
    return res.status(statusCode).json({
      status: statusCode,
      [x]: "".concat(dataOrError),
      success: false
    });
  }

  x = 'data';
  return res.status(statusCode).json({
    status: statusCode,
    [x]: dataOrError,
    success: true
  });
};

var _default = response;
exports.default = _default;