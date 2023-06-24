"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _Domain = _interopRequireDefault(require("../../Domain"));
//Get product
module.exports = async ({
  params: {
    id
  }
}, res) => {
  try {
    const product = await _Domain.default.findById(id);
    res.json(product);
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