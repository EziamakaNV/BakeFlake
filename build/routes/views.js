"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _Authentication = _interopRequireDefault(require("../middleware/Authentication"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
const router = _express.default.Router();

const option = {
  root: process.cwd()
};

const sendFile = (res, path, options) => {
  return res.sendFile(path, options);
};

router.get('/', (req, res) => {
  sendFile(res, 'views/login.html', option);
});
router.get('/dashboard', _Authentication.default.verifyToken, (req, res) => {
  sendFile(res, 'views/dashboard.html', option);
});
router.get('/create_recipient', _Authentication.default.verifyToken, (req, res) => {
  sendFile(res, 'views/create_recepient.html', option);
});
router.get('/transfer_funds', _Authentication.default.verifyToken, (req, res) => {
  sendFile(res, 'views/transfer_funds.html', option);
});
router.get('/bulk_transfer', _Authentication.default.verifyToken, (req, res) => {
  sendFile(res, 'views/bulk_transfer.html', option);
});
router.get('/logout', _Authentication.default.verifyToken, (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true
  });
  res.clearCookie('user');
  res.redirect('/');
});
var _default = router;
exports.default = _default;