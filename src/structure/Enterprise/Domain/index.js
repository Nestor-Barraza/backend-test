import mongoose, { Schema, model } from "mongoose";

const EnterpriseSchema = new Schema(
  {
    NIT: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

module.exports = model("Enterprise", EnterpriseSchema);
