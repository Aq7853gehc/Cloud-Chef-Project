import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
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
  address: {
    type: String,
    require: true,
  },
  bio:{
    type:String,
    require:false
  },
  cart:{
    type: Schema.Types.ObjectId,
    ref: "Cart"
  },
  
});

export  const User = mongoose.model("User", userSchema);
