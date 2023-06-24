"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _index = _interopRequireDefault(require("../../Domain/index"));
var _constants = require("../../../../utils/constants");
var _errors = require("../../../../utils/errors");
module.exports = async ({
  body: {
    email,
    password
  }
}, res) => {
  //Validations

  if (!_constants.REGEX_EMAIL.test(email)) {
    console.log(_errors.NOT_VALID_EMAIL);
    res.status(400).json(_errors.NOT_VALID_EMAIL);
  }
  try {
    const user = await _index.default.findOne({
      email
    });

    //Match password
    const matchPassword = await _bcryptjs.default.compareSync(password, user.password);
    if (matchPassword) {
      //User props
      const {
        _id,
        full_name,
        NIT,
        role,
        phone
      } = user;

      //Access token
      const access_token = _jsonwebtoken.default.sign({
        _id,
        full_name,
        NIT,
        role,
        email,
        phone
      }, _constants.JWT_SIGNATURE, {
        expiresIn: "30m"
      });
      //Refresh token
      const refresh_token = _jsonwebtoken.default.sign({
        _id,
        full_name,
        NIT,
        role,
        email,
        phone
      }, _constants.JWT_SIGNATURE, {
        expiresIn: "1d"
      });
      res.status(200).send({
        access_token,
        refresh_token
      });
    } else {
      res.status(401).send(_errors.NOT_MATCH_CREDENTIALS);
    }
  } catch ({
    name,
    message
  }) {
    console.log({
      message,
      code: name
    });
    res.json({
      message,
      code: name
    });
  }
};