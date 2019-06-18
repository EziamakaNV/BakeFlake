"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.replace");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _Validation = _interopRequireDefault(require("../validations/Validation"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable object-curly-newline */

/* eslint-disable linebreak-style */
require('dotenv').config();

class UserController {
  static signin(req, res) {
    const {
      password
    } = req.body; // Remove empty spaces from the email and set to lowercase

    const email = req.body.email.replace(/\s/g, '').toLowerCase();
    const validationObject = {
      email,
      password
    };

    const {
      error
    } = _Validation.default.loginValidation(validationObject);

    if (error) {
      res.status(400).json({
        status: 400,
        error: "Issue with credentials supplied. Problem: ".concat(error)
      });
    } else {
      const user = _User.default.findUser(email);

      if (user) {
        // Compare passwords
        _bcrypt.default.compare(password, user.password, (err, same) => {
          if (err) {
            res.status(500).json({
              status: 500,
              error: 'Internal Server Error',
              success: false
            });
          } else if (same) {
            // (same-boolean) If the passwords match
            const token = _jsonwebtoken.default.sign({
              id: user.id,
              email
            }, process.env.JWT_SECRET, {
              expiresIn: '8760h'
            });

            res.cookie('jwt', token, {
              maxAge: 31540000000,
              httpOnly: true
            });
            res.cookie('user', JSON.stringify({
              firstName: user.firstName,
              lastName: user.lastName
            }), {
              maxAge: 31540000000
            });
            res.status(200).json({
              status: 200,
              data: {
                token,
                id: user.id,
                first_name: user.firstName,
                last_name: user.lastName,
                email
              }
            });
          } else {
            res.status(401).json({
              status: 401,
              error: 'The Username/Paswword is incorrect'
            });
          }
        });
      } else {
        res.status(401).json({
          status: 401,
          error: 'The Username/Paswword is incorrect'
        });
      }
    }
  }

}

var _default = UserController;
exports.default = _default;