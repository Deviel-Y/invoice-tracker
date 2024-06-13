import formatNumber from "@/app/formatNumber";
import prisma from "@/prisma/client";
import { Invoice } from "@prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "../components/Link";
import { BiSolidTrash } from "react-icons/bi";
import DeleteInvoiceButton from "../[id]/DeleteInvoiceButton";

const InvoiceList = async () => {
  const invoices = await prisma.invoice.findMany();

  if (!invoices) return null;

  const columns: { label: string; value: keyof Invoice | "actionButton" }[] = [
    { label: "Invoice Number", value: "invoiceNumber" },
    { label: "Company Name", value: "companyName" },
    { label: "Total Price", value: "invoiceTotalPrice" },
    { label: "Created At", value: "createdAt" },
    { label: "Updated At", value: "updatedAt" },
    { label: "Action button", value: "actionButton" },
  ];

  return (
    <>
      {invoices.length !== 0 && (
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.ColumnHeaderCell align="center" key={column.value}>
                  {column.label}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {invoices.map((invoice) => (
              <Table.Row align="center" key={invoice.id}>
                <Table.Cell align="center">
                  <Link href={`/invoice/${invoice.id}`}>
                    {invoice.invoiceNumber}
                  </Link>
                </Table.Cell>
                <Table.Cell align="center">{invoice.companyName}</Table.Cell>
                <Table.Cell align="center">{`${formatNumber(
                  invoice.invoiceTotalPrice
                )} T`}</Table.Cell>
                <Table.Cell align="center">
                  {invoice.createdAt.toDateString()}
                </Table.Cell>
                <Table.Cell align="center">
                  {invoice.updatedAt.toDateString()}
                </Table.Cell>
                <Table.Cell align="center">
                  <DeleteInvoiceButton variant="outline" invoiceId={invoice.id}>
                    <BiSolidTrash size={18} fill="red" />
                  </DeleteInvoiceButton>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </>
  );
};

export default InvoiceList;
