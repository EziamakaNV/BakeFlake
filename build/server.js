"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _user = _interopRequireDefault(require("./routes/user"));

var _api = _interopRequireDefault(require("./routes/api"));

var _views = _interopRequireDefault(require("./routes/views"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable eol-last */
require('dotenv').config();

const app = (0, _express.default)();
const PORT = process.env.PORT || 5000;
app.use((0, _cookieParser.default)());
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_express.default.static('public'));
app.use('/api/v1/auth', _user.default);
app.use('/api/v1', _api.default);
app.use('/', _views.default); // Not Found Handler

app.use((req, res) => {
  res.status(404).send('Not Found!');
});

if (process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log("App listening on port ".concat(PORT)));
}

var _default = app;
exports.default = _default;