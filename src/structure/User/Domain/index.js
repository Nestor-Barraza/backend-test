import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    full_name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

//Hook
UserSchema.pre("save", function (next) {
  const saltRounds = 10;
  const plainPassword = this.password;
  const hash = bcrypt.hashSync(plainPassword, saltRounds);
  this.password = hash;
  next();
});

module.exports = model("User", UserSchema);
