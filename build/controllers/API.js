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

const axiosInstance = _axios.default.create({
  baseURL: 'https://api.paystack.co',
  headers: {
    'Authorization': "Bearer ".concat(process.env.PAYSTACK_SECRET_KEY)
  },
  validateStatus: status => {
    return status < 500;
  } // Reject only if the status code is greater than or equal to 500

});

require('dotenv').config();

class APIController {
  static async checkBalance(req, res) {
    try {
      const responseBody = await axiosInstance.get('/balance');

      if (responseBody.status > 299) {
        return (0, _Response.default)(res, responseBody.status, responseBody.data.message);
      } else {
        (0, _Response.default)(res, responseBody.status, responseBody.data);
      }
    } catch (error) {
      (0, _Response.default)(res, error.response.status, error.response.data);
    }
  }

  static async createRecipient(req, res) {
    const {
      name,
      account_number,
      bank_code,
      description
    } = req.body;
    const validationObject = {
      name,
      account_number,
      bank_code,
      description
    };

    const {
      error
    } = _Validation.default.createRecipient(validationObject);

    if (error) {
      (0, _Response.default)(res, 400, error);
    } else {
      try {
        const responseBody = await axiosInstance.post('/transferrecipient', {
          type: 'nuban',
          name,
          account_number,
          bank_code,
          currency: 'NGN',
          description
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

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

  static async getRecipients(req, res) {
    if (req.query.hasOwnProperty('perPage') && req.query.hasOwnProperty('page')) {
      console.log(1);
      const perPage = Number(req.query.perPage);
      const page = Number(req.query.page);

      const {
        error
      } = _Validation.default.getRecipients({
        perPage,
        page
      });

      if (error) {
        (0, _Response.default)(res, 400, error);
      } else {
        try {
          const responseBody = await axiosInstance.get('/transferrecipient', {
            params: {
              perPage,
              page
            }
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
    } else {
      try {
        const responseBody = await axiosInstance.get('/transferrecipient');
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
        const responseBody = await axiosInstance.get('/bank/resolve', {
          params: {
            account_number,
            bank_code
          }
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

  static async initiateTransfer(req, res) {
    const {
      recipient,
      reason
    } = req.body;
    const amount = Number(req.body.amount);

    const {
      error
    } = _Validation.default.initiateTransfer({
      amount,
      recipient,
      reason
    });

    if (error) {
      (0, _Response.default)(res, 400, error);
    } else {
      try {
        const responseBody = await axiosInstance.post('/transfer', {
          source: 'balance',
          amount: amount * 100,
          // Convert to kobo
          currency: 'NGN',
          reason: reason,
          recipient
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

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

  static async bulkTransfer(req, res) {
    const {
      transfers
    } = req.body;

    const {
      error
    } = _Validation.default.bulkTransfer({
      transfers
    });

    if (error) {
      (0, _Response.default)(res, 400, error);
    } else {
      //convert all the amounts in Naira to Kobo
      transfers.forEach(transfer => transfer.amount *= 100);

      try {
        const responseBody = await axiosInstance.post('/transfer/bulk', {
          source: 'balance',
          transfers,
          currency: 'NGN'
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

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