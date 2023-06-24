"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _Domain = _interopRequireDefault(require("../../Domain"));
// Enterprise
module.exports = async ({
  params: {
    NIT
  },
  user: {
    _id,
    role
  }
}, res) => {
  try {
    const enterprise = await _Domain.default.aggregate([{
      $match: {
        NIT
      }
    }, {
      $lookup: {
        from: "products",
        localField: "NIT",
        foreignField: "enterpriseNIT",
        as: "products"
      }
    }]);
    res.status(200).json(enterprise);
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