import formatNumber from "@/app/formatNumber";
import prisma from "@/prisma/client";
import { Invoice } from "@prisma/client";
import { Button, Table } from "@radix-ui/themes";
import { BiSolidTrash } from "react-icons/bi";
import DeleteInvoiceButton from "../[id]/DeleteInvoiceButton";
import NextLink from "../components/Link";
import Link from "next/link";
import { ArrowBottomLeftIcon, ArrowTopLeftIcon } from "@radix-ui/react-icons";

interface Props {
  invoices: Invoice[];
  searchParams: { search: string; orderByFilter: keyof Invoice };
}

const InvoiceList = ({
  invoices,
  searchParams: { orderByFilter, search },
}: Props) => {
  return (
    <>
      {invoices.length !== 0 && (
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.ColumnHeaderCell align="center" key={column.value}>
                  {orderByFilter === column.value && (
                    <ArrowBottomLeftIcon className="inline" />
                  )}
                  <Link
                    href={{
                      query: {
                        orderByFilter: column.value,
                        search,
                      },
                    }}
                  >
                    {column.label}
                  </Link>
                </Table.ColumnHeaderCell>
              ))}
              <Table.ColumnHeaderCell align="center">
                Action Button
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {invoices.map((invoice) => (
              <Table.Row align="center" key={invoice.id}>
                <Table.Cell align="center">
                  <NextLink href={`/invoice/${invoice.id}`}>
                    {invoice.invoiceNumber}
                  </NextLink>
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

const columns: { label: string; value: keyof Invoice | "actionButton" }[] = [
  { label: "Invoice Number", value: "invoiceNumber" },
  { label: "Company Name", value: "companyName" },
  { label: "Total Price", value: "invoiceTotalPrice" },
  { label: "Created At", value: "createdAt" },
  { label: "Updated At", value: "updatedAt" },
];

export const columnNames = columns.map((column) => column.value);

export default InvoiceList;
