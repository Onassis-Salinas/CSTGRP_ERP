import { z } from 'zod';

export const idSchema = z.object({
  id: z.string(),
});

export const movementsFilterSchema = z.object({
  code: z.string().nullable(),
  import: z.string().nullable(),
  programation: z.string().nullable(),
  jobpo: z.string().nullable(),
});

export const updateAmountSchema = z.object({
  id: z.string(),
  newAmount: z.string(),
});

export const importSchema = z.object({
  import: z.string(),
  due: z.string(),
  materials: z.array(
    z.object({
      code: z.string(),
      amount: z.string(),
    }),
  ),
});

export const exportSchema = z.object({
  programation: z.string(),
  jobpo: z.string(),
  due: z.string(),
  materials: z.array(
    z.object({
      code: z.string(),
      amount: z.string(),
      active: z.boolean(),
    }),
  ),
});
