"use client";

import { Box, Button, Card, Flex, Text, TextField } from "@radix-ui/themes";

const ProductForm = () => {
  return (
    <form>
      <Card>
        <Flex direction="column" gap="5">
          <Box>
            <Text as="label">Product Name</Text>
            <TextField.Root size="3" />
          </Box>

          <Box>
            <Text as="label">Quantity</Text>
            <TextField.Root size="3" />
          </Box>

          <Box>
            <Text as="label">Unit</Text>
            <TextField.Root size="3" />
          </Box>

          <Box>
            <Text as="label">Price Per Each</Text>
            <TextField.Root size="3" />
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
