import { z } from "zod";

export type InvoiceType = z.infer<typeof createInvoiceSchema>;
export type ProductType = z.infer<typeof addProductSchema>; //for ProductForm
export type ProductStoreType = z.infer<typeof ProductStoreSchema>; //for zustand store

//This is for ProductForm
export const addProductSchema = z.object({
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

//And this is for zustand store
export const ProductStoreSchema = z.object({
  productName: z.string(),

  quantity: z.number(),

  unit: z.enum(["meter", "branch", "piece"]),

  pricePerEach: z.number(),

  productTotalPrice: z.number(),
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

  invoiceTotalPrice: z.number().min(1),

  products: z.array(ProductStoreSchema),
});
