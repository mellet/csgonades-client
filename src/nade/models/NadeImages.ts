import { z } from "zod";

export const nadeImagesSchema = z.object({
  result: z.object({
    small: z.string(),
    medium: z.string(),
    large: z.string(),
  }),
  lineup: z.object({
    small: z.string(),
    medium: z.string(),
    large: z.string(),
  }),
});

export type NadeImages = z.infer<typeof nadeImagesSchema>;
