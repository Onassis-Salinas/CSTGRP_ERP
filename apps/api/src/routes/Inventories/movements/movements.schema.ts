import { z } from 'zod';

export const idSchema = z.object({
  id: z.string(),
});

export const movementsFilterSchema = z.object({
  code: z.string().nullable(),
  import: z.string().nullable(),
  programation: z.string().nullable(),
  jobpo: z.string().nullable(),
  checked: z.string().nullable(),
  req: z.string().nullable(),
});

export const updateAmountSchema = z.object({
  id: z.string(),
  newAmount: z.string(),
});

export const scrapSchema = z.object({
  code: z.string(),
  amount: z.string(),
});

export const suppliesSchema = z.object({
  code: z.string(),
  amount: z.string(),
});

export const repositionSchema = z.object({
  code: z.string(),
  amount: z.string(),
  job: z.string(),
});

export const returnSchema = z.object({
  code: z.string(),
  amount: z.string(),
  job: z.string().optional().nullable(),
});
