import mongoose  from "mongoose";

export type OrderI = {
  createdAt: Date;
  _id: string;
  user: string;
  items: {
    _id: string;
    title: string;
    type: "Veg" | "Non-Veg";
    price: number;
    discription: string;
    category: string;
    createdBy: string;
  }[];

  totalAmount: number;
  status: "pending" | "completed" | "canceled";
};

export interface IUser extends Document {
  _id: string;
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

export interface IOrder extends Document {
  _id: string;
  user: mongoose.Types.ObjectId;
  items: mongoose.Types.ObjectId[];
  totalAmount: number;
  status: "pending" | "completed" | "canceled";
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuItem { 
  title: string;
  type: "Veg" | "Non-Veg";
  price: number;
  discription: string;
  category: string;
  createdBy: mongoose.Types.ObjectId;
}
