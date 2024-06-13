"use client";

import useProductStore from "@/app/store";
import {
  invoiceInfoSchema,
  InvoiceInfoType,
  ProductType,
} from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import CalloutAlert from "./Callout";
import { Invoice } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Props {
  invoice?: Invoice;
}

const InvoiceInfoForm = ({ invoice }: Props) => {
  const router = useRouter();

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
    if (products.length === 0)
      return toast.error("Product list cannot be empty");
    const promise = invoice
      ? axios.put("/api/invoice/" + invoice?.id, {
          ...data,
          invoiceTotalPrice,
          products,
        })
      : axios.post("/api/invoice", {
          ...data,
          invoiceTotalPrice,
          products,
        });

    toast.promise(promise, {
      loading: "Saving...",
      success: "Invoice Saved",
      error: "Could not save invoice",
    });

    router.push("/invoice/list");
  });

  return (
    <>
      <form onSubmit={submithandler}>
        <Flex direction="column" gap="5">
          <Flex gap="5">
            <Box>
              <Text as="label">Invoice Number</Text>
              <TextField.Root
                defaultValue={invoice?.invoiceNumber}
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
                defaultValue={invoice?.companyName}
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
                defaultValue={invoice?.invoiceDescription}
                className="!transition-all"
                size="3"
                {...register("invoiceDescription")}
              />
              {errors.invoiceDescription && (
                <CalloutAlert>{errors.invoiceDescription.message}</CalloutAlert>
              )}
            </Box>

            <Button
              className="!transition-all !cursor-pointer"
              size="3"
              type="submit"
              color="blue"
            >
              {invoice ? "Update Invoice" : "Create Invoice"}
            </Button>
          </Flex>
        </Flex>
      </form>
      <Toaster />
    </>
  );
};

export default InvoiceInfoForm;
