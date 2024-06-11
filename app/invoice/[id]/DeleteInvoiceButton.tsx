"use client";

import { Invoice } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import axios from "axios";

interface Props {
  invoice: Invoice;
}

const DeleteInvoiceButton = ({ invoice }: Props) => {
  return (
    <Button
      className="!transition-all !cursor-pointer"
      color="red"
      onClick={() => axios.delete(`/api/invoice/${invoice.id}`)}
    >
      Delete invoice
    </Button>
  );
};

export default DeleteInvoiceButton;
