"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _Authentication = _interopRequireDefault(require("../middleware/Authentication"));

var _API = _interopRequireDefault(require("../controllers/API"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
const router = _express.default.Router();

router.get('/balance', _Authentication.default.verifyToken, _API.default.checkBalance);
router.get('/validate_account', _Authentication.default.verifyToken, _API.default.validateAccount);
router.route('/transferrecipient').post(_Authentication.default.verifyToken, _API.default.createRecipient).get(_Authentication.default.verifyToken, _API.default.getRecipients);
var _default = router;
exports.default = _default;