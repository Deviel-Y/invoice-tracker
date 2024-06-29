import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import UserInfoForm from "./UserInfoForm";

interface Props {
  params: { id: string };
}

const UserInfoPage = async ({ params: { id } }: Props) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) notFound();

  return <UserInfoForm user={user} />;
};

export default UserInfoPage;
