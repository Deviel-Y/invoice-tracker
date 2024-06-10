import { Box, Flex, Grid } from "@radix-ui/themes";
import ProductForm from "../components/ProductForm";
import ProductListTable from "../components/ProductListTable";
import InvoiceInfo from "../components/InvoiceInfo";

const CreateNewInvoicePage = () => {
  return (
    <Flex direction="column" gap="5">
      <Box>
        <InvoiceInfo />
      </Box>
      <Grid gap="5" columns={"3"}>
        <ProductForm />
        <ProductListTable />
      </Grid>
    </Flex>
  );
};

export default CreateNewInvoicePage;
