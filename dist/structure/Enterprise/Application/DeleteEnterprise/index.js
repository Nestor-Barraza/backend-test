"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _index = _interopRequireDefault(require("../../Domain/index"));
var _errors = require("../../../../utils/errors");
//Delete Enterprise
module.exports = async ({
  params: {
    NIT
  },
  user: {
    role
  }
}, res) => {
  //Roles permission
  if (role !== "admin") return res.status(401).send(_errors.ACCESS_DENIED);
  if (!NIT) {
    return res.status(400).json({
      message: "You can not update leaving fields empty",
      code: "EMPTY_FIELDS"
    });
  } else {
    try {
      const deleteEnterprise = await _index.default.deleteOne({
        NIT
      });
      if (deleteEnterprise) {
        return res.json({
          message: "Enterprise successfully removed",
          code: "DELETE_ENTERPRISE"
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
};