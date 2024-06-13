"use client";

import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const CreateNewInvoiceButton = () => {
  const router = useRouter();

  return (
    <Button
      size="3"
      className="!transition-all !cursor-pointer"
      color="blue"
      type="button"
      onClick={() => router.push("/invoice/new")}
    >
      Create New Invoice
    </Button>
  );
};

export default CreateNewInvoiceButton;
