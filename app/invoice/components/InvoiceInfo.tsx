"use client";

import { Box, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";

const invoiceInfo = () => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Flex direction="column" gap="5">
        <Flex gap="5">
          <Box>
            <Text as="label">Invoice Number</Text>
            <TextField.Root
              type="number"
              size="3"
              {...register("invoiceNumber", { valueAsNumber: true })}
            />
          </Box>

          <Box flexGrow="1">
            <Text as="label">Company Name</Text>
            <TextField.Root size="3" {...register("companyName")} />
          </Box>
        </Flex>

        <Flex gap="5" align="end">
          <Box flexGrow="1">
            <Text as="label">Invoice Description</Text>
            <TextField.Root size="3" {...register("invoiceDescription")} />
          </Box>

          <Button size="3" type="submit" color="blue">
            Save Invoice
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default invoiceInfo;
