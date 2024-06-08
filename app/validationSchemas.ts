import { z } from "zod";

export type InvoiceType = z.infer<typeof createInvoiceSchema>;

const product = z.object({
  name: z.string().min(1),
});

export const createInvoiceSchema = z.object({
  invoiceNumber: z.number().min(1),
  invoiceDescription: z.string().min(1),
  companyName: z.string().min(1),
  totalPrice: z.number().min(1),
  products: z.array(product),
});
