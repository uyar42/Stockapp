import { z } from "zod";

export const usingStockSchema = z.object({
  _id: z.string(),
  quantity: z.number().min(1, { message: "En az 1 ürün kullanmalısınız" }),
});

export const productSchema = z.object({
  _id: z.string(),
  name: z.string().min(),
  category: z.string().min(),
  quantity: z.number().min(1, "En az 1 ürün eklemelisiniz"),
});
