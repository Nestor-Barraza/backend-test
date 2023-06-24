"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("./utils/middlewares/cors"));
var _structure = require("./structure");
require("./config/database");
//General config
require("dotenv").config();

//initializations
const app = (0, _express.default)();
//Middlewares
app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_express.default.json());
app.use((0, _expressFileupload.default)({
  createParentPath: true
}));
app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_express.default.json());
app.use((0, _morgan.default)("dev"));
app.use(_cors.default);

//Settings
app.set("port", process.env.PORT || 8000);

//Routes
app.use(_structure.userRouter);
app.use(_structure.enterpriseRouter);
app.use(_structure.productRouter);
module.exports = app;