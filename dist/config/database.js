"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _mongoose = _interopRequireDefault(require("mongoose"));
var _constants = require("../utils/constants");
require("colors");
require("dotenv").config();
const databaseConnect = async () => {
  try {
    await _mongoose.default.connect(_constants.CLUSTER_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Successful database connection".white, "Mr.Robot".red);
  } catch (error) {
    console.log(error);
  }
};
databaseConnect();