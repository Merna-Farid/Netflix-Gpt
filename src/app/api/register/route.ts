import { connectToDatabase } from "@/lib/db";
import User from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    console.log("Connected to database");

    const { name, email, password, image } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    

    await User.create({
      name,
      email,
      password,
      image
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
  console.error("========== REGISTER ERROR ==========");
  console.error(error);
  console.error("Message:", error.message);
  console.error("Name:", error.name);
  console.error("Stack:", error.stack);

  return NextResponse.json(
    {
      error: error.message,
    },
    { status: 500 }
  );
}
}