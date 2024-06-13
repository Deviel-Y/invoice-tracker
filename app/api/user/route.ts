import { createUserSchema, CreateUserType } from "@/app/userValidationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/prisma/client";

export const POST = async (request: NextRequest) => {
  const body: CreateUserType = await request.json();
  const { email, password } = body;

  const validation = createUserSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (user) return NextResponse.json({ error: "User is already exists" });

  const hashedPassword: string = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: { email, hashedPassword },
  });

  return NextResponse.json(newUser.email, { status: 201 });
};
