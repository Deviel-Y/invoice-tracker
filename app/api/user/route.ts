import { signUpSchema, SignUpUserType } from "@/app/userValidationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/prisma/client";

export const GET = async (request: NextRequest) => {
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
};

export const POST = async (req: NextRequest) => {
  const body: SignUpUserType = await req.json();
  const { confirmPassword, email, password } = body;

  const validation = signUpSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (user)
    return NextResponse.json("User with this email is already exists", {
      status: 400,
    });

  const isPasswordsMatch: boolean = confirmPassword === password;
  if (!isPasswordsMatch)
    return NextResponse.json("Passwords doesn't match", { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: { email, hashedPassword },
    });

    return NextResponse.json(newUser.email, { status: 201 });
  } catch (error) {
    console.log(error);
  }
};
