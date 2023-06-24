"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _index = _interopRequireDefault(require("../../Domain/index"));
var _errors = require("../../../../utils/errors");
//New product
module.exports = async ({
  body: {
    title,
    description,
    price,
    unitsAvailable,
    enterpriseNIT
  },
  user: {
    role
  }
}, res) => {
  //Roles permission
  if (role !== "admin") return res.status(401).send(_errors.ACCESS_DENIED);
  try {
    const newProduct = await new _index.default({
      title,
      description,
      price,
      unitsAvailable,
      enterpriseNIT
    });
    await newProduct.save();
    res.json(newProduct);
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