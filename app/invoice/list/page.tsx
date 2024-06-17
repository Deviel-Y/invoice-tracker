import { Flex, Grid } from "@radix-ui/themes";
import InvoiceList from "./InvoiceList";
import CreateNewInvoiceButton from "./CreateNewInvoiceButton";
import prisma from "@/prisma/client";

const InvoiceListPage = async () => {
  const invoices = await prisma.invoice.findMany();

  if (!invoices) return null;

  return (
    <Grid columns="1" gap="3">
      <Flex>
        <CreateNewInvoiceButton />
      </Flex>
      <InvoiceList invoices={invoices} />
    </Grid>
  );
};

export const revalidate = 0;

export default InvoiceListPage;
