"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _constants = require("../utils/constants");
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _nodemailerSesTransport = _interopRequireDefault(require("nodemailer-ses-transport"));
//AWS Config

const SendEmailClient = _nodemailer.default.createTransport((0, _nodemailerSesTransport.default)({
  accessKeyId: _constants.ACCESS_KEY_ID,
  secretAccessKey: _constants.SECRET_ACCESS_KEY,
  region: _constants.REGION
}));
var _default = SendEmailClient;
exports.default = _default;