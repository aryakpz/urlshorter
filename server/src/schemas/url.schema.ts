import { z } from "zod";

export const urlSchema = z.object({
  url: z.string().url(),
  shorturl: z.string().min(1),
  length: z.number().int().positive(),
  id: z.number().min(1),
});
