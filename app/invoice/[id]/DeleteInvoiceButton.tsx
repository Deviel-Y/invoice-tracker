"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  invoiceId: string;
  children: ReactNode;
  variant?:
    | "soft"
    | "classic"
    | "solid"
    | "surface"
    | "outline"
    | "ghost"
    | undefined;
}

const DeleteInvoiceButton = ({ invoiceId, children, variant }: Props) => {
  const router = useRouter();

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button
          variant={variant}
          color="red"
          className="!transition-all !cursor-pointer"
        >
          {children}
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Title>Invoice Deletion</AlertDialog.Title>

        <AlertDialog.Description>
          Are you sure you want to delete this invoice? this action cannot be
          undone.
        </AlertDialog.Description>

        <Flex gap="4" justify="end" mt="5">
          <AlertDialog.Cancel>
            <Button
              color="gray"
              variant="outline"
              className="!transition-all !cursor-pointer"
            >
              Cancel
            </Button>
          </AlertDialog.Cancel>

          <AlertDialog.Action>
            <Button
              color="red"
              className="!transition-all !cursor-pointer"
              onClick={() => {
                axios.delete(`/api/invoice/${invoiceId}`);
                router.push("/invoice/list");
              }}
            >
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteInvoiceButton;
