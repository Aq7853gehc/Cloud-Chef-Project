import mongoose, { Document } from "mongoose";
import { model, Schema } from "mongoose";
export interface MenuItem {
  title: string;
  type: "Veg" | "Non-Veg";
  price: number;
  discription: string;
  category: string;
}

export interface Imenu extends MenuItem,Document {}

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
