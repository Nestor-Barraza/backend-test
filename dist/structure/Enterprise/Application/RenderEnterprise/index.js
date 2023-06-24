"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _Domain = _interopRequireDefault(require("../../Domain"));
// Enterprise
module.exports = async (req, res) => {
  try {
    const allEnterprise = await _Domain.default.aggregate([{
      $lookup: {
        from: "products",
        localField: "NIT",
        foreignField: "enterpriseNIT",
        as: "products"
      }
    }]);
    res.status(200).json(allEnterprise);
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