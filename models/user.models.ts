// @ts-nocheck
import mongoose, { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  address?: string; // Optional field
  role: "chef" | "customer";
  phone: string;
  specialty?: string; // Required only for chefs
  exp?: number; // Required only for chefs
  bio?: string; // Required only for chefs
}
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    enums: ["chef", "customer"],
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: function () {
      return this.role === "chef";
    },
  },
  exp: {
    type: Number,
    required: function () {
      return this.role === "chef";
    },
  },
  bio: {
    type: String,
    required: function () {
      return this.role === "chef";
    },
  },
});

export const User = mongoose.models?.User || model("User", userSchema);
