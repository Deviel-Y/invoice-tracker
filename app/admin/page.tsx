import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AuthOption from "../api/auth/AuthOptions";
import UserListTable from "./_components/UserListTable";

const AdminPage = async () => {
  const users = await prisma.user.findMany();

  const session = await getServerSession(AuthOption);
  const user = users.find((user) => user.email === session?.user?.email);
  if (user?.role === "USER") redirect("/");

  return <UserListTable users={users} />;
};

export default AdminPage;
