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

  static async createRecipient(req, res) {
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

  static async validateAccount(req, res) {
    const account_number = req.query.account_number;
    const bank_code = req.query.bank_code;
    const validationObject = {
      account_number,
      bank_code
    };

    const {
      error
    } = _Validation.default.accountValidation(validationObject);

    console.log(account_number, bank_code);

    if (error) {
      (0, _Response.default)(res, 400, error);
    } else {
      try {
        const responseBody = await _axios.default.get('https://api.paystack.co/bank/resolve', {
          headers: {
            'Authorization': "Bearer ".concat(process.env.PAYSTACK_SECRET_KEY)
          },
          params: {
            account_number,
            bank_code
          },
          validateStatus: status => {
            return status < 500;
          } // Reject only if the status code is greater than or equal to 500

        });
        console.log(responseBody.data);

        if (responseBody.status > 299) {
          return (0, _Response.default)(res, responseBody.status, responseBody.data.message);
        } else {
          (0, _Response.default)(res, responseBody.status, responseBody.data);
        }
      } catch (error) {
        (0, _Response.default)(res, error.response.status, error.response.data);
      }
    }
  }

}

var _default = APIController;
exports.default = _default;