import prisma from "@/prisma/client";
import UserDetailForm from "./UserDetailForm";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const UserDetailPage = async ({ params: { id } }: Props) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) notFound();

  return <UserDetailForm user={user} />;
};

export default UserDetailPage;
