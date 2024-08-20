import {
  forgetPasswordSchema,
  ForgetPasswordSchemaType,
} from "@/app/schemas/userValidationSchema";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body: ForgetPasswordSchemaType = await request.json();
  const { email, confirmPassword } = body;

  const validation = forgetPasswordSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json("Invalid Entry", { status: 400 });

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
  if (!user) return NextResponse.json("No User Found", { status: 404 });

  const hashedPassword = await bcrypt.hash(confirmPassword!, 10);

  await prisma.user.update({
    where: { email: email.toLocaleLowerCase() },
    data: { hashedPassword: hashedPassword },
  });

  return NextResponse.json("Password has been reset");
};
