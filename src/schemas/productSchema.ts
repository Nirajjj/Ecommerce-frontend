// schemas/productSchema.ts
import { z } from "zod";

export const productSchema = z
  .object({
    name: z
      .string()
      .min(1, "Product name is required")
      .max(100, "Name must be under 100 characters"),

    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(1000, "Description must be under 1000 characters"),

    mrp: z
      .number({ error: "MRP is required" })
      .positive("MRP must be greater than 0"),

    price: z
      .number({ error: "Price is required" })
      .positive("Price must be greater than 0"),

    stock: z
      .number({ error: "Stock is required" })
      .int("Stock must be a whole number")
      .min(0, "Stock cannot be negative"),

    category: z.string().min(1, "Please select a category"),
  })
  .refine((data) => data.price <= data.mrp, {
    message: "Price cannot be greater than MRP",
    path: ["price"],
  });

export type ProductFormValues = z.infer<typeof productSchema>;
