"use client";

import { useForm } from "react-hook-form";

import { Box, Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import useProductStore from "@/app/store";
import { productSchema, ProductType } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import CalloutAlert from "./Callout";
import { error } from "console";

const ProductForm = () => {
  const addProduct = useProductStore((s) => s.addProduct);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductType>({ resolver: zodResolver(productSchema) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        addProduct(data);
      })}
    >
      <Card>
        <Flex direction="column" gap="5">
          <Box>
            <Text as="label">Product Name</Text>
            <TextField.Root
              className="!transition-all"
              {...register("productName")}
              size="3"
            />
            {errors.productName && (
              <CalloutAlert>{errors.productName.message}</CalloutAlert>
            )}
          </Box>

          <Box>
            <Text as="label">Quantity</Text>
            <TextField.Root
              type="number"
              className="!transition-all"
              {...register("quantity", { valueAsNumber: true })}
              size="3"
            />
            {errors.quantity && (
              <CalloutAlert>{errors.quantity.message}</CalloutAlert>
            )}
          </Box>

          <Box>
            <Text as="label">Unit</Text>
            <TextField.Root
              className="!transition-all"
              {...register("unit")}
              size="3"
            />
            {errors.unit && <CalloutAlert>{errors.unit.message}</CalloutAlert>}
          </Box>

          <Box>
            <Text as="label">Price Per Each</Text>
            <TextField.Root
              type="number"
              className="!transition-all"
              {...register("pricePerEach", { valueAsNumber: true })}
              size="3"
            />
            {errors.pricePerEach && (
              <CalloutAlert>{errors.pricePerEach.message}</CalloutAlert>
            )}
          </Box>

          <Flex gap="3">
            <Button
              className="!cursor-pointer !transition-all"
              size="3"
              color="blue"
            >
              Add Product
            </Button>
            <Button
              className="!cursor-pointer !transition-all"
              size="3"
              type="reset"
              color="red"
            >
              Reset Form
            </Button>
          </Flex>
        </Flex>
      </Card>
    </form>
  );
};

export default ProductForm;
