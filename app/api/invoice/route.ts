import {
  invoiceInfoSchema,
  InvoiceType,
} from "@/app/schemas/invoiceValidationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body: InvoiceType = await request.json();
  const {
    companyName,
    invoiceDescription,
    invoiceNumber,
    invoiceTotalPrice,
    products,
  } = body;

  const validation = invoiceInfoSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const invoice = await prisma.invoice.findUnique({
    where: { invoiceNumber },
  });

  if (invoice)
    return NextResponse.json(
      { message: "Invoice is already exist" },
      { status: 400 }
    );

  if (products.length === 0)
    return NextResponse.json(
      { error: "product cannot be empty" },
      { status: 400 }
    );

  const newInvoice = await prisma.invoice.create({
    data: {
      companyName,
      invoiceDescription,
      invoiceNumber,
      invoiceTotalPrice,
      products: {
        create: [...products],
      },
    },

    include: { products: true },
  });

  return NextResponse.json(newInvoice);
};
