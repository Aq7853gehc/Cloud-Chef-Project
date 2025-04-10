import mongoose, { Document } from "mongoose";
import { model, Schema } from "mongoose";

export interface Imenu extends Document {
  title: String;
  type: "Veg" | "Non-Veg";
  price: Number;
  discription: String;
  category: String;
}

const menuSchema = new Schema<Imenu>(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Veg", "Non-Veg"],
      required: true,
      default: "Veg",
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Menu = mongoose.models.Menu || model("Menu", menuSchema);
