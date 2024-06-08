"use client";

import { useForm } from "react-hook-form";

import { Box, Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import useProductStore from "@/app/store";
import { ProductType } from "@/app/validationSchemas";

const ProductForm = () => {
  const addProduct = useProductStore((s) => s.addProduct);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductType>();

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
            <TextField.Root {...register("productName")} size="3" />
          </Box>

          <Box>
            <Text as="label">Quantity</Text>
            <TextField.Root {...register("quantity")} size="3" />
          </Box>

          <Box>
            <Text as="label">Unit</Text>
            <TextField.Root {...register("unit")} size="3" />
          </Box>

          <Box>
            <Text as="label">Price Per Each</Text>
            <TextField.Root {...register("pricePerEach")} size="3" />
          </Box>

          <Flex gap="3">
            <Button size="3" color="blue">
              Add Product
            </Button>
            <Button size="3" type="reset" color="red">
              Reset Form
            </Button>
          </Flex>
        </Flex>
      </Card>
    </form>
  );
};

export default ProductForm;
