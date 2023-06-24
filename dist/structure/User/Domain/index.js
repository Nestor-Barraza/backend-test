"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _mongoose = require("mongoose");
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
const UserSchema = new _mongoose.Schema({
  full_name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

//Hook
UserSchema.pre("save", function (next) {
  const saltRounds = 10;
  const plainPassword = this.password;
  const hash = _bcryptjs.default.hashSync(plainPassword, saltRounds);
  this.password = hash;
  next();
});
module.exports = (0, _mongoose.model)("User", UserSchema);