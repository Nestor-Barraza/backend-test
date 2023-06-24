"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _index = _interopRequireDefault(require("../../Domain/index"));
var _errors = require("../../../../utils/errors");
//Update Enterprise
module.exports = async ({
  body: {
    name,
    address,
    phone,
    NIT
  },
  user: {
    role
  }
}, res) => {
  //Roles permission
  if (role !== "admin") return res.status(401).send(_errors.ACCESS_DENIED);
  if (!name || !name || !phone || !address) {
    return res.status(400).json({
      message: "You can not update leaving fields empty",
      code: "EMPTY_FIELDS"
    });
  } else {
    try {
      //Update
      const getEnterprise = await _index.default.find({
        NIT
      });
      if (getEnterprise) {
        const updateEnterprise = await _index.default.updateOne({
          NIT
        }, {
          name,
          address,
          phone
        });
        if (updateEnterprise) {
          return res.json({
            message: "company successfully updated",
            code: "UPDATE_SUCCESSFULL"
          });
        }
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