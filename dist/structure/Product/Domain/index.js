"use strict";

var _mongoose = require("mongoose");
const productSchema = new _mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  unitsAvailable: {
    type: Number,
    require: true
  },
  amount: {
    type: String,
    require: true
  },
  enterpriseNIT: {
    type: String,
    ref: "enterprises",
    required: true
  }
}, {
  timestamps: true
});
module.exports = (0, _mongoose.model)("Product", productSchema);