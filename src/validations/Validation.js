/* eslint-disable linebreak-style */
import Joi from '@hapi/joi';

class Validation {
  static loginValidation(validationObject) {
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(20).required(),
    };
    return Joi.validate(validationObject, schema);
  }

  static accountValidation(validationObject) {
    const schema = {
      account_number:  Joi.string().min(9).max(10).required(),
      bank_code: Joi.string().min(3).max(3).required(),
    };
    return Joi.validate(validationObject, schema);
  }

  static createRecipient(validationObject) {
    const schema = {
      name: Joi.string().min(1).max(60).required(),
      account_number: Joi.string().min(9).max(10).required(),
      bank_code: Joi.string().min(3).max(3).required(),
      description: Joi.string().min(0).max(50),
    };
    return Joi.validate(validationObject, schema);
  }

  static getRecipients(validationObject) {
    const schema = {
      perPage: Joi.number().integer().min(1).max(999),
      page: Joi.number().integer().min(1).max(999),
    };
    return Joi.validate(validationObject, schema);
  }

  static initiateTransfer(validationObject) {
    const schema = {
      amount: Joi.number().integer().min(50).required(),
      recipient: Joi.string().min(1).max(200).required(),
      reason: Joi.string().min(1).max(50).required(),
    };
    return Joi.validate(validationObject, schema);
  }

  static bulkTransfer(validationObject) {
    const transfer = Joi.object().keys({amount: Joi.number().integer().min(50).required(), recipient: Joi.string().min(1).max(200).required()});
    const schema = {
      transfers: Joi.array().items(transfer),
    };
    return Joi.validate(validationObject, schema);
  }
}

export default Validation;
