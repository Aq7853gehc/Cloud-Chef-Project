"use server";

import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user.models";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const data = await req.json();
    const {
      role,
      email,
      password,
      name,
      address,
      bio,
      speciality,
      experience,
      phone,
    } = data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "User already exited",
      });
    }

    const hasPassword = await bcrypt.hash(password, 10);
    await User.create({
      role,
      email,
      password: hasPassword,
      address,
      bio,
      speciality,
      experience,
      phone,
      name,
    });

    return NextResponse.json(
      { success: true, message: "Account created successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: `Server error ${err}`,
      },
      { status: 500 }
    );
  }
};
