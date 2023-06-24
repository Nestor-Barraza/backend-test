"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _CreateEnterprise = _interopRequireDefault(require("./CreateEnterprise"));
var _RenderEnterprise = _interopRequireDefault(require("./RenderEnterprise"));
var _FindEnterprise = _interopRequireDefault(require("./FindEnterprise"));
var _UpdateEnterprise = _interopRequireDefault(require("./UpdateEnterprise"));
var _DeleteEnterprise = _interopRequireDefault(require("./DeleteEnterprise"));
//Controler
const enterpriseCtrl = {};
enterpriseCtrl.createNewEnterprise = _CreateEnterprise.default;
enterpriseCtrl.renderEnterprise = _RenderEnterprise.default;
enterpriseCtrl.findEnterprise = _FindEnterprise.default;
enterpriseCtrl.updateEnterprise = _UpdateEnterprise.default;
enterpriseCtrl.deleteEnterprise = _DeleteEnterprise.default;
module.exports = enterpriseCtrl;