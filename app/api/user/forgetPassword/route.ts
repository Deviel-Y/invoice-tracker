import {
  forgetPasswordSchema,
  ForgetPasswordSchema,
} from "@/app/schemas/userValidationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body: ForgetPasswordSchema = await request.json();
    const { email } = body;

    const validation = forgetPasswordSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const user = await prisma.user.findUnique({
      where: { email: email.toLocaleLowerCase() },
    });
    if (!user) {
      return (
        NextResponse.json("User Not Found", { status: 404 }),
        NextResponse.json(false)
      );
    }

    return NextResponse.json(true);
  } catch (error) {
    return NextResponse.json(error);
  }
};
