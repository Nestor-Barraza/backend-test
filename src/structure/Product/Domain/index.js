import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    unitsAvailable: { type: Number, require: true },
    amount: { type: String, require: true },
    enterpriseNIT: { type: String, ref: "enterprises", required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", productSchema);
