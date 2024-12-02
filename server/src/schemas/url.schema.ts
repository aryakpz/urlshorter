import { z } from "zod";

export const urlSchema = z.object({
  url: z.string().url(),
  length: z.number().int().positive(),
})

export const editSchema=z.object({
  url:z.string().url()
})