"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _Validation = _interopRequireDefault(require("../validations/Validation"));

var _Response = _interopRequireDefault(require("../responses/Response"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Cloudinary
require('dotenv').config();

class APIController {
  static async checkBalance(req, res) {
    try {
      const responseBody = await _axios.default.get('https://api.paystack.co/balance', {
        headers: {
          'Authorization': "Bearer ".concat(process.env.PAYSTACK_SECRET_KEY)
        }
      });
      (0, _Response.default)(res, responseBody.status, responseBody.data);
    } catch (error) {
      (0, _Response.default)(res, 500, error);
    }
  }

}

var _default = APIController;
exports.default = _default;