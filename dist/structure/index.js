"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "enterpriseRouter", {
  enumerable: true,
  get: function () {
    return _Enterprise.default;
  }
});
Object.defineProperty(exports, "productRouter", {
  enumerable: true,
  get: function () {
    return _Product.default;
  }
});
Object.defineProperty(exports, "userRouter", {
  enumerable: true,
  get: function () {
    return _User.default;
  }
});
var _User = _interopRequireDefault(require("./User"));
var _Enterprise = _interopRequireDefault(require("./Enterprise"));
var _Product = _interopRequireDefault(require("./Product"));