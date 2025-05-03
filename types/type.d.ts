import mongoose  from "mongoose";

export type OrderI = {
  createdAt: Date;
  _id: string;
  user: {
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
  };
  items: {
    _id: string;
    title: string;
    type: "Veg" | "Non-Veg";
    price: number;
    discription: string;
    category: string;
    createdBy: {
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
  }[];  

  totalAmount: number;
  status: "pending" | "completed" | "canceled";
  message?:string
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
  message?:string
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



export interface IChef extends Document {
  user: mongoose.Types.ObjectId;
  menu: mongoose.Types.ObjectId[];
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  acceptedOrders: mongoose.Types.ObjectId[];
}

