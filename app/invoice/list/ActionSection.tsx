"use client";

import { Flex } from "@radix-ui/themes";
import CreateNewInvoiceButton from "./CreateNewInvoiceButton";
import SearchInput from "./SearchInput";

const ActionSection = () => {
  return (
    <Flex gap="5">
      <CreateNewInvoiceButton />
      <SearchInput />
    </Flex>
  );
};

export default ActionSection;
