import { Flex, Grid } from "@radix-ui/themes";
import InvoiceList, { columnNames } from "./InvoiceList";
import CreateNewInvoiceButton from "./CreateNewInvoiceButton";
import prisma from "@/prisma/client";
import { Invoice } from "@prisma/client";
import ActionSection from "./ActionSection";

interface Props {
  searchParams: { orderByFilter: keyof Invoice; search: string };
}

const InvoiceListPage = async ({
  searchParams: { orderByFilter, search },
}: Props) => {
  const orderBy = columnNames.includes(orderByFilter)
    ? { [orderByFilter]: "desc" }
    : undefined;

  const invoices = await prisma.invoice.findMany({
    where: { companyName: { contains: search } },
    orderBy,
  });

  if (!invoices) return null;

  return (
    <Grid columns="1" gap="3">
      <ActionSection />
      <InvoiceList
        searchParams={{ search, orderByFilter }}
        invoices={invoices}
      />
    </Grid>
  );
};

export const revalidate = 0;

export default InvoiceListPage;
