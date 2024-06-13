import formatNumber from "@/app/formatNumber";
import prisma from "@/prisma/client";
import { Invoice } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
const InvoiceList = async () => {
  const invoices = await prisma.invoice.findMany();

  if (!invoices) return null;

  const columns: { label: string; value: keyof Invoice }[] = [
    { label: "Invoice Number", value: "invoiceNumber" },
    { label: "Company Name", value: "companyName" },
    { label: "Total Price", value: "invoiceTotalPrice" },
    { label: "Created At", value: "createdAt" },
    { label: "Updated At", value: "updatedAt" },
  ];

  return (
    <>
      {invoices.length !== 0 && (
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.ColumnHeaderCell key={column.value}>
                  {column.label}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {invoices.map((invoice) => (
              <Table.Row key={invoice.id}>
                <Table.Cell>
                  <Link href={`/invoice/${invoice.id}`}>
                    {invoice.invoiceNumber}
                  </Link>
                </Table.Cell>
                <Table.Cell>{invoice.companyName}</Table.Cell>
                <Table.Cell>{`${formatNumber(
                  invoice.invoiceTotalPrice
                )} T`}</Table.Cell>
                <Table.Cell>{invoice.createdAt.toDateString()}</Table.Cell>
                <Table.Cell>{invoice.updatedAt.toDateString()}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </>
  );
};

export default InvoiceList;
