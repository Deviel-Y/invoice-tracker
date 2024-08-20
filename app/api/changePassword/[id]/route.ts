import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export const POST = async (request: NextRequest, { params: { id } }: Props) => {
  try {
    const body = await request.json();
    const { oldPassword } = body;

    const user = await prisma.user.findUnique({ where: { id } });
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
