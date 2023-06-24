"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _CreateProduct = _interopRequireDefault(require("./CreateProduct"));
var _index = _interopRequireDefault(require("./GetProduct/index"));
var _UpdateProduct = _interopRequireDefault(require("./UpdateProduct"));
var _DeleteProduct = _interopRequireDefault(require("./DeleteProduct"));
var _DownloadPdf = _interopRequireDefault(require("./DownloadPdf"));
var _SendPdf = _interopRequireDefault(require("./SendPdf"));
//Controler
const productCtrl = {};

//Use cases [Application]
productCtrl.createNewproduct = _CreateProduct.default;
productCtrl.getProduct = _index.default;
productCtrl.updateProduct = _UpdateProduct.default;
productCtrl.deleteProduct = _DeleteProduct.default;
productCtrl.getPdf = _DownloadPdf.default;
productCtrl.sendPdf = _SendPdf.default;
module.exports = productCtrl;