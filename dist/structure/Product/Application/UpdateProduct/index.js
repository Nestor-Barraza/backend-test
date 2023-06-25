"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _index = _interopRequireDefault(require("../../Domain/index"));
var _constants = require("../../../../utils/constants");
//Edit product
module.exports = async ({
  body: {
    title,
    description,
    price,
    unitsAvailable,
    id
  },
  user: {
    role
  }
}, res) => {
  //Roles permission
  if (role !== "admin") return res.status(401).send(_constants.ACCESS_DENIED);
  if (!title || !description || !price || !unitsAvailable || !id) {
    return res.status(400).json({
      message: "You can not update leaving fields empty",
      code: "EMPTY_FIELDS"
    });
  } else {
    try {
      //Update
      const getProduct = await _index.default.find({
        _id: id
      });
      if (getProduct) {
        const newProduct = await _index.default.updateOne({
          _id: id
        }, {
          title,
          description,
          price,
          unitsAvailable
        });
        if (newProduct) {
          return res.json({
            message: "Product successfully updated",
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