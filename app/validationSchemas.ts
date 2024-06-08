import { z } from "zod";

export type InvoiceType = z.infer<typeof createInvoiceSchema>;
export type ProductType = z.infer<typeof productSchema>;

const productSchema = z.object({
  name: z.string().min(1),
});

export const createInvoiceSchema = z.object({
  invoiceNumber: z
    .number({ message: "Invoice number is required" })
    .min(1, "Invoice number is required"),
  invoiceDescription: z.string().min(1, "Invoice description is required"),
  companyName: z
    .string()
    .min(1, "Company name is required")
    .max(255, "Maximum character reached"),
  totalPrice: z.number().min(1),
  products: z.array(productSchema),
});
