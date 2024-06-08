import { z } from "zod";

export type InvoiceType = z.infer<typeof createInvoiceSchema>;
export type ProductType = z.infer<typeof productSchema>;

export const productSchema = z.object({
  productName: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Maximum character reached"),

  quantity: z
    .number({ message: "Quantity is required" })
    .min(1, "Invoice number is required")
    .max(1_000_000_000, "Maximum amount reached"),

  unit: z.enum(["meter", "branch", "piece"], {
    errorMap: () => ({
      message: "type one of three values: meter | branch | piece",
    }),
  }),

  pricePerEach: z
    .number({ message: "Price per each field is required" })
    .min(1, "Invoice number is required"),
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
