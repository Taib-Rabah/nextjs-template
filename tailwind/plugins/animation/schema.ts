import { z } from "zod";

export const optionsSchema = z.object({
  duration: z.string().default("700ms"),
  delay: z.string().default("0ms"),
  timing: z.string().default("ease"),
  mode: z.string().default("forwards"),
  direction: z.string().default("normal"),
  count: z.string().default("1"),
  startX: z.string().default("0"),
  endX: z.string().default("0"),
  startY: z.string().default("0"),
  endY: z.string().default("0"),
  startScaleX: z.string().default("1"),
  endScaleX: z.string().default("1"),
  startScaleY: z.string().default("1"),
  endScaleY: z.string().default("1"),
  startRotate: z.string().default("0deg"),
  endRotate: z.string().default("0deg"),
  startOpacity: z.string().default("1"),
  endOpacity: z.string().default("1"),
});

export type Options = z.infer<typeof optionsSchema>;