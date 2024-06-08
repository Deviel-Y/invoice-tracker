import { Box, Button, Flex, Text, TextField } from "@radix-ui/themes";

const invoiceInfo = () => {
  return (
    <form>
      <Flex direction="column" gap="5">
        <Flex gap="5" align="end">
          <Box>
            <Text as="label">Invoice Number</Text>
            <TextField.Root size="3" />
          </Box>

          <Box flexGrow="1">
            <Text as="label">Compant Name</Text>
            <TextField.Root size="3" />
          </Box>

          <Button size="3" type="submit" color="blue">
            Save Invoice
          </Button>
        </Flex>

        <Box>
          <Text as="label">Invoice Description</Text>
          <TextField.Root size="3" />
        </Box>
      </Flex>
    </form>
  );
};

export default invoiceInfo;
