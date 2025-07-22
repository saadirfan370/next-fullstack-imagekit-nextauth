import { NextRequest, NextResponse } from "next/server";
import { connetToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Email and password are required",
        },
        { status: 400 }
      );
    }

    await connetToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          error: "User already registered",
        },
        { status: 400 }
      );
    }

    await User.create({
      email,
      password,
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Registration err", error);
    return NextResponse.json(
      {
        error: "Failed to register User",
      },
      { status: 400 }
    );
  }
}
