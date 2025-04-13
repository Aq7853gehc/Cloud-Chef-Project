"use server";

import dbConnect from "@/lib/dbConnect";
import { Menu, MenuItem } from "@/models/menu.modules";

export const getAllMenuItem = async (): Promise<{
  success: boolean;
  data?: MenuItem[];
  error?: string;
}> => {
  await dbConnect();
  try {
    const result = await Menu.find().lean().exec();
    if (!result || result.length === 0) {
      return { success: false, error: "No menu items found" };
    }
    const menuResult = JSON.parse(JSON.stringify(result));
    return { success: true, data: menuResult };
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch menu items",
    };
  }
};

export const addMenuItem = async (
  data: MenuItem
): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> => {
  await dbConnect();
  try {
    if (!data || !data.title || !data.price) {
      return { success: false, error: "Required fields are missing" };
    }

    // Check if menu item already exists
    const existingItem = await Menu.findOne({ title: data.title })
      .lean()
      .exec();
    if (existingItem) {
      return {
        success: false,
        error: "Menu item with this title already exists",
      };
    }

    // Create new menu item
    const result = await Menu.create(data);
    if (!result) {
      return { success: false, error: "Failed to create menu item" };
    }

    return {
      success: true,
      message: "Menu item added successfully",
    };
  } catch (error) {
    console.error("Error adding menu item:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add menu item",
    };
  }
};

