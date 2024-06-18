"use client";

import { TextField } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

const SearchInput = () => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const params = new URLSearchParams(searchParam);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;

    if (searchQuery) params.set("search", searchQuery);
    if (!searchQuery) {
      params.set("search", "");
    }

    const query = params.size && "?" + params.toString();

    router.push(`/invoice/list/${query}`);
  };

  return (
    <TextField.Root
      placeholder="Company Search"
      size="3"
      className="!transition-all"
      onChange={onChangeHandler}
    ></TextField.Root>
  );
};

export default SearchInput;
