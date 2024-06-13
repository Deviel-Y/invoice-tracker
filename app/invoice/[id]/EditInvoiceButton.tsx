"use client";

import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  invoiceId: string;
}

const EditInvoiceButton = ({ invoiceId }: Props) => {
  const router = useRouter();
  return (
    <Button
      className="!transition-all !cursor-pointer"
      onClick={() => router.push(`/invoice/edit/${invoiceId}`)}
    >
      Edit Invoice
    </Button>
  );
};

export default EditInvoiceButton;
