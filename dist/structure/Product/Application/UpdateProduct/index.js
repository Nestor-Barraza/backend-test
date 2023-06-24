"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _index = _interopRequireDefault(require("../../Domain/index"));
//Edit product
module.exports = async ({
  body: {
    title,
    description,
    price,
    unitsAvailable,
    id
  }
}, res) => {
  if (!title || !description || !price || !unitsAvailable || !id) {
    return res.status(400).json({
      message: "You can not update leaving fields empty",
      code: "EMPTY_FIELDS"
    });
  } else {
    try {
      const newProduct = await _index.default.findByIdAndUpdate(id, {
        title,
        description,
        price,
        unitsAvailable
      }, {
        new: true
      });
      if (newProduct) {
        return res.json({
          message: "Product successfully updated",
          code: "UPDATE_SUCCESSFULL"
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