"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _index = _interopRequireDefault(require("./SignIn/index"));
var _index2 = _interopRequireDefault(require("./SignUp/index"));
//Controler
const usersCtrl = {};

//Use cases [Application]

usersCtrl.signIn = _index.default;
usersCtrl.signUp = _index2.default;
module.exports = usersCtrl;