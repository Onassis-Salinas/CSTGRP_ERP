import { date, z } from 'zod';

export const idSchema = z.object({
  id: z.string(),
});

export const IEFilterSchema = z.object({
  code: z.string().nullable(),
  type: z.string().nullable(),
});

export const movementsFilterSchema = z.object({
  code: z.string().nullable(),
  import: z.string().nullable(),
  programation: z.string().nullable(),
  jobpo: z.string().nullable(),
  checked: z.string().nullable(),
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

export const updateImportSchema = z.object({
  id: z.string(),
  import: z.string(),
  location: z.string(),
});

export const updateExportSchema = z.object({
  id: z.string(),
  due: z.string(),
  jobpo: z.string(),
  programation: z.string(),
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
