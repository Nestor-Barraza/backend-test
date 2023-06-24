"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _mongoose = require("mongoose");
var _constants = require("../utils/constants");
var _errors = require("../utils/errors");
const helpers = {};
helpers.isAuthenticated = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) return res.status(401).send(_errors.TOKEN_REQUIRED);
  token = token.replace("Bearer ", "");
  _jsonwebtoken.default.verify(token, _constants.JWT_SIGNATURE, function (err, user) {
    //Show JWT errors
    if (err) {
      const {
        name,
        message
      } = err;
      console.log({
        code: name,
        message
      });
      return res.status(401).send({
        code: name,
        message
      });
    }
    // Denied access
    if (user.role !== "admin") return res.status(401).send(_errors.ACCESS_DENIED);
    // Allow access
    req.user = {
      ...user,
      _id: user._id,
      role: user.role
    };
    next();
  });
};
module.exports = helpers;