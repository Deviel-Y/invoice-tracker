import {
  invoiceSchema,
  InvoiceType,
} from "@/app/schemas/invoiceValidationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export const DELETE = async (
  request: NextRequest,
  { params: { id } }: Props
) => {
  const invoice = await prisma.invoice.findUnique({ where: { id } });

  if (!invoice)
    return NextResponse.json(
      { error: "Invoice does not exist" },
      { status: 404 }
    );

  await prisma.invoice.delete({ where: { id } });

  return NextResponse.json(invoice);
};

export const PUT = async (request: NextRequest, { params: { id } }: Props) => {
  const body: InvoiceType = await request.json();
  const {
    companyName,
    invoiceDescription,
    invoiceNumber,
    invoiceTotalPrice,
    products,
  } = body;

  const invoice = await prisma.invoice.findUnique({
    where: { id },
  });

  if (!invoice)
    return NextResponse.json(
      { error: "requested invoice doesn't exist" },
      { status: 404 }
    );

  const validation = invoiceSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const updatedInvoice = await prisma.invoice.update({
    where: { id },
    data: {
      companyName,
      invoiceDescription,
      invoiceNumber,
      invoiceTotalPrice,
      products: {
        deleteMany: {},
        create: [...products],
      },
    },
    include: { products: true },
  });

  return NextResponse.json(updatedInvoice);
};
