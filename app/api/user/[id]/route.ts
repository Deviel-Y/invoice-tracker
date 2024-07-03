import {
  updateUserInfoSchema,
  UpdateUserInfoType,
} from "@/app/schemas/userValidationSchema";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export const PATCH = async (
  request: NextRequest,
  { params: { id } }: Props
) => {
  const body: UpdateUserInfoType = await request.json();
  const {
    currentPassword,
    newPassword,
    firstname,
    lastname,
    role,
    email,
    image,
  } = body;

  const validation = updateUserInfoSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return NextResponse.json("User does not exist", { status: 404 });

  if (currentPassword && newPassword) {
    const passwordsMatch: boolean = await bcrypt.compare(
      currentPassword!,
      user.hashedPassword
    );
    if (!passwordsMatch)
      return NextResponse.json("Passwords does not match", { status: 400 });

    var updatedPassword = await bcrypt.hash(newPassword!, 10);
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      name: `${firstname} ${lastname}`,
      hashedPassword: updatedPassword!,
      role,
      email,
      image,
    },
  });
  return NextResponse.json(updatedUser.email);
};
