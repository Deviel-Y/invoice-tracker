"use client";

import { Flex } from "@radix-ui/themes";
import CreateNewInvoiceButton from "./CreateNewInvoiceButton";
import SearchInput from "./SearchInput";

interface Props {
  invoiceCount: number;
}

const ActionSection = ({ invoiceCount }: Props) => {
  return (
    <Flex gap="5">
      <CreateNewInvoiceButton />
      {invoiceCount !== 0 && <SearchInput />}
    </Flex>
  );
};

export default ActionSection;
