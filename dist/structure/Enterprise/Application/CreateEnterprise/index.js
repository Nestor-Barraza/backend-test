"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _index = _interopRequireDefault(require("../../Domain/index"));
var _uuid = require("uuid");
var _errors = require("../../../../utils/errors");
//New Enterprise
module.exports = async ({
  body: {
    name,
    address,
    phone
  },
  user: {
    _id,
    role
  }
}, res) => {
  //Roles permission
  if (role !== "admin") return res.status(401).send(_errors.ACCESS_DENIED);
  try {
    const newEnterprise = await new _index.default({
      name,
      NIT: (0, _uuid.v4)(),
      address,
      phone,
      userId: _id
    });
    await newEnterprise.save();
    res.json(newEnterprise);
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