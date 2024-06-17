import { Flex, Grid } from "@radix-ui/themes";
import InvoiceList, { columnNames } from "./InvoiceList";
import CreateNewInvoiceButton from "./CreateNewInvoiceButton";
import prisma from "@/prisma/client";
import { Invoice } from "@prisma/client";

interface Props {
  searchParams: { orderByFilter: keyof Invoice };
}

const InvoiceListPage = async ({ searchParams: { orderByFilter } }: Props) => {
  const orderBy = columnNames.includes(orderByFilter)
    ? { [orderByFilter]: "asc" }
    : undefined;

  const invoices = await prisma.invoice.findMany({
    orderBy,
  });

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
