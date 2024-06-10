"use client";

import useProductStore from "@/app/store";
import { Box, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { FieldValues, useForm } from "react-hook-form";
import CalloutAlert from "./Callout";
import { invoiceInfoSchema, InvoiceInfoType } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const InvoiceInfo = () => {
  const products = useProductStore((s) => s.products);
  const invoiceTotalPrice = products.reduce(
    (acc, sum) => acc + sum.productTotalPrice,
    0
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceInfoType>({ resolver: zodResolver(invoiceInfoSchema) });

  const submithandler = handleSubmit((data) => {
    const promise = axios.post("/api/invoice", {
      ...data,
      invoiceTotalPrice,
      products,
    });

    toast.promise(promise, {
      loading: "Saving...",
      success: "Invoice Saved",
      error: "Could not save invoice",
    });
  });

  return (
    <>
      <form onSubmit={submithandler}>
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
      <Toaster />
    </>
  );
};

export default InvoiceInfo;
