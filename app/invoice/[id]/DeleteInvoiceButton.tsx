"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  invoiceId: string;
}

const DeleteInvoiceButton = ({ invoiceId }: Props) => {
  const router = useRouter();

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" className="!transition-all !cursor-pointer">
          Delete Invoice
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
