import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
  },
  passoword: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["customer", "chef"],
    require: true,
  },
});

export const User = mongoose.model("User", userSchema);
