"use client";

import useProductStore from "@/app/store";
import { Box, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import CalloutAlert from "./Callout";
import { invoiceInfoSchema, InvoiceInfoType } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

const InvoiceInfo = () => {
  const products = useProductStore((s) => s.products);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceInfoType>({ resolver: zodResolver(invoiceInfoSchema) });

  return (
    <form
      onSubmit={handleSubmit((data) =>
        console.log({
          ...data,
          invoiceTotalPrice: products.reduce(
            (acc, sum) => acc + sum.productTotalPrice,
            0
          ),
          products,
        })
      )}
    >
      <Flex direction="column" gap="5">
        <Flex gap="5">
          <Box>
            <Text as="label">Invoice Number</Text>
            <TextField.Root
              className="!transition-all"
              type="number"
              size="3"
              {...register("invoiceNumber", { valueAsNumber: true })}
            />
            {errors.invoiceNumber && (
              <CalloutAlert>{errors.invoiceNumber.message}</CalloutAlert>
            )}
          </Box>

          <Box flexGrow="1">
            <Text as="label">Company Name</Text>
            <TextField.Root
              className="!transition-all"
              size="3"
              {...register("companyName")}
            />
            {errors.companyName && (
              <CalloutAlert>{errors.companyName.message}</CalloutAlert>
            )}
          </Box>
        </Flex>

        <Flex gap="5" align="end">
          <Box flexGrow="1">
            <Text as="label">Invoice Description</Text>
            <TextField.Root
              className="!transition-all"
              size="3"
              {...register("invoiceDescription")}
            />
            {errors.invoiceDescription && (
              <CalloutAlert>{errors.invoiceDescription.message}</CalloutAlert>
            )}
          </Box>

          <Button size="3" type="submit" color="blue">
            Save Invoice
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default InvoiceInfo;
