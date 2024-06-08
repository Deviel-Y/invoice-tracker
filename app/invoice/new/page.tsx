import { Box, Flex } from "@radix-ui/themes";
import ProductForm from "../components/ProductForm";
import ProductListTable from "../components/ProductListTable";
import InvoiceInfo from "../components/InvoiceInfo";

const CreateNewInvoicePage = () => {
  return (
    <Flex direction="column" gap="5">
      <Box>
        <InvoiceInfo />
      </Box>
      <Flex gap="5">
        <ProductForm />
        <ProductListTable />
      </Flex>
    </Flex>
  );
};

export default CreateNewInvoicePage;
