import { z } from 'zod';

export const idSchema = z.object({
  id: z.string(),
});

export const movementsFilterSchema = z.object({
  code: z.string().nullable(),
  programation: z.string().nullable(),
  jobpo: z.string().nullable(),
});

export const jobsSchema = z.object({
  code: z.string(),
});

export const requisitionSchema = z.object({
  petitioner: z.string(),
  motive: z.string(),
  areaId: z.string(),
  code: z.string(),
  requested: z.string().refine((v) => /^\d*(?:\.\d{1,2})?$/.test(v)),
  jobIds: z.array(z.string()).transform((v) => v.map((vv) => Number(vv))),
});
