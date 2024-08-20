import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { oldPassword, email } = body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json("Invalid User", { status: 404 });
    }

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      user.hashedPassword
    );

    if (!isPasswordMatch) {
      return NextResponse.json("Passwords Doesn't Match", { status: 404 });
    }

    return NextResponse.json(isPasswordMatch);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};
