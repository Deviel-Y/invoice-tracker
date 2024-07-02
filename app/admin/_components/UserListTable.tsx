import Link from "@/app/invoice/components/Link";
import { User } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import React from "react";

interface Props {
  users: User[];
}

const UserListTable = ({ users }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Modified At</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {users.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>
              <Link href={`/admin/${user.id}`}>{user.email}</Link>
            </Table.Cell>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.id}</Table.Cell>
            <Table.Cell>{user.createdAt.toDateString()}</Table.Cell>
            <Table.Cell>{user.updatedAt.toDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default UserListTable;
