import { Flex, Grid } from "@radix-ui/themes";
import InvoiceList from "./InvoiceList";
import CreateNewInvoiceButton from "./CreateNewInvoiceButton";

const InvoiceListPage = () => {
  return (
    <Grid columns="1" gap="3">
      <Flex>
        <CreateNewInvoiceButton />
      </Flex>
      <InvoiceList />
    </Grid>
  );
};

export default InvoiceListPage;
