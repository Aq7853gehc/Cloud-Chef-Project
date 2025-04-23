"use server";

import dbConnect from "@/lib/dbConnect";
import { CartItem } from "../user/menu/page";
import { Order } from "@/models/order.models";
import { revalidatePath } from "next/cache";
import { OrderI,IOrder } from "@/types/type";

type addOrderProps = {
  user: string;
  items: CartItem[];
  totalAmount: number;
};
export const addOrder = async (
  data: addOrderProps,
): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> => {
  await dbConnect();
  try {
    if (!data) throw new Error("No data recieve");
    const result = await Order.create(data);
    if (!result) throw new Error("Order creation fail");
    revalidatePath("/user/order");
    revalidatePath("/user/dashboard");
    return { success: true, message: "Order created successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "there is some prblm" };
  }
};

export const getOrderDetail = async (
  userId: string,
): Promise<{
  success: boolean;
  data?: IOrder[];
  error?: string;
}> => {
  await dbConnect();
  try {
    if (!userId) throw new Error("User id must be here");
    const result = await Order.find({ user: userId }).populate("items").exec();
    if (!result) throw new Error("No data found");
    const plainText = JSON.parse(JSON.stringify(result));
    return { success: true, data: plainText };
  } catch (error) {
    console.error(error);
    return { success: false, error: `${error}` };
  }
};

export const getLatestOrders = async (
  userId: string,
): Promise<{
  success: boolean;
  data?: OrderI[];
  message?: string;
}> => {
  await dbConnect();

  try {
    const order = await Order.find({ user: userId })
      .populate("items")
      .sort({ createdAt: -1 })
      .limit(1)
      .exec();
    console.log(order[0].items);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(order)),
      message: "Latest orders fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching latest orders:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch orders",
    };
  }
};

export const deleteOrder = async (
  orderId: string,
): Promise<{
  success: boolean;
  message?: string;
}> => {
  await dbConnect();

  try {
    const order = await Order.find({ _id: orderId });
    if (!order) throw new Error("Order not found");
    const r = await Order.deleteOne({ _id: orderId });
    if (!r.acknowledged) throw new Error("Not deleted");
    return { success: true, message: "Order deleted successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete order" };
  }
};

export const getAllOrder = async (): Promise<{
  success: boolean;
  data?: OrderI[];
  error?: string; 
}> => {
  await dbConnect();
  try {
    const resp = await Order.find().populate("items").exec();
    if (!resp) throw new Error("Not Found");
    console.log(resp);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(resp)),
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: `${error}` };
  }
};
