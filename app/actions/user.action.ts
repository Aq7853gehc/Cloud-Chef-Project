"use server";

import dbConnect from "@/lib/dbConnect";
import {  User } from "@/models/user.models";

export const getuser = async (email:string) => {
  await dbConnect();
  if (!email) throw new Error("No email is there");
  try {
    const user = await User.find({ email: email }).lean().exec();
    if (!user) throw new Error("User Not found");
    const personData = JSON.parse(JSON.stringify(user));
    return { success: true, data: personData };
  } catch (error) {
    console.error(error);
    return { success: false, msg: error };
  }
};
