import prisma from "@/prisma/client";
import { Invoice } from "@prisma/client";
import { Grid } from "@radix-ui/themes";
import ActionSection from "./ActionSection";
import InvoiceList, { columnNames } from "./InvoiceList";

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

  const invoiceCount = await prisma.invoice.count();

  if (!invoices) return null;

  return (
    <Grid columns="1" gap="3">
      <ActionSection invoiceCount={invoiceCount} />
      <InvoiceList
        searchParams={{ search, orderByFilter }}
        invoices={invoices}
      />
    </Grid>
  );
};

export const revalidate = 0;

export default InvoiceListPage;
