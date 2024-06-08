import { createInvoiceSchema, InvoiceType } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body: InvoiceType = await request.json();
  const {
    companyName,
    invoiceDescription,
    invoiceNumber,
    totalPrice,
    products,
  } = body;

  const validation = createInvoiceSchema.safeParse(body);

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

  const newInvoice = await prisma.invoice.create({
    data: {
      companyName,
      invoiceDescription,
      invoiceNumber,
      totalPrice,
      products: {
        create: [...products],
      },
    },

    include: { products: true },
  });

  return NextResponse.json(newInvoice);
};
