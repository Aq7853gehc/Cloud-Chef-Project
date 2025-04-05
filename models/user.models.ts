// @ts-nocheck
import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
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
