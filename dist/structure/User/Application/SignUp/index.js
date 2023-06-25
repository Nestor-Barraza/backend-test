"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _index = _interopRequireDefault(require("../../Domain/index"));
var _constants = require("../../../../utils/constants");
var _errors = require("../../../../utils/errors");
//Controller
module.exports = async ({
  body: {
    full_name,
    NIT,
    role,
    phone,
    email,
    password
  }
}, res) => {
  switch (true) {
    case !_constants.PASSWORD_REGEX.test(password):
      {
        console.log(_errors.INVALID_PASSWORD);
        return res.status(400).json(_errors.INVALID_PASSWORD);
      }
    case !_constants.REGEX_EMAIL.test(email):
      {
        console.log(_errors.NOT_VALID_EMAIL);
        return res.status(400).json(_errors.NOT_VALID_EMAIL);
      }
    case !_constants.PHONE_REGEX.test(phone):
      {
        console.log(_errors.INVALID_PHONE);
        return res.status(400).json(_errors.INVALID_PHONE);
      }
    default:
      {
        const findUserInDatabase = await _index.default.find({
          email
        });
        if (findUserInDatabase) {
          res.json(_errors.EMAIL_ALREADY_IS_REGISTERED);
        } else {
          try {
            const newUser = new _index.default({
              full_name,
              NIT,
              role,
              email,
              phone,
              password
            });
            const createUser = await newUser.save();
            if (createUser) {
              res.status(200).json({
                message: "Successfully registered user",
                code: "ACCOUNT_REGISTERED"
              });
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
        }
      }
      break;
  }
};