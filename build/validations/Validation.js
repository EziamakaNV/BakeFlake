"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
class Validation {
  static loginValidation(validationObject) {
    const schema = {
      email: _joi.default.string().email().required(),
      password: _joi.default.string().min(6).max(20).required()
    };
    return _joi.default.validate(validationObject, schema);
  }

  static accountValidation(validationObject) {
    const schema = {
      account_number: _joi.default.string().min(9).max(10).required(),
      bank_code: _joi.default.string().min(3).max(3).required()
    };
    return _joi.default.validate(validationObject, schema);
  }

  static createRecipient(validationObject) {
    const schema = {
      name: _joi.default.string().min(1).max(60).required(),
      account_number: _joi.default.string().min(9).max(10).required(),
      bank_code: _joi.default.string().min(3).max(3).required(),
      description: _joi.default.string().min(0).max(50)
    };
    return _joi.default.validate(validationObject, schema);
  }

  static getRecipients(validationObject) {
    const schema = {
      perPage: _joi.default.number().integer().min(1).max(999),
      page: _joi.default.number().integer().min(1).max(999)
    };
    return _joi.default.validate(validationObject, schema);
  }

  static initiateTransfer(validationObject) {
    const schema = {
      amount: _joi.default.number().integer().min(50).required(),
      recipient: _joi.default.string().min(1).max(200).required(),
      reason: _joi.default.string().min(1).max(50).required()
    };
    return _joi.default.validate(validationObject, schema);
  }

  static bulkTransfer(validationObject) {
    const transfer = _joi.default.object().keys({
      amount: _joi.default.number().integer().min(50).required(),
      recipient: _joi.default.string().min(1).max(200).required()
    });

    const schema = {
      transfers: _joi.default.array().items(transfer)
    };
    return _joi.default.validate(validationObject, schema);
  }

}

var _default = Validation;
exports.default = _default;