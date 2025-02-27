import { z } from 'zod';

export const idSchema = z.object({
  id: z.string(),
});

export const filterSchema = z.object({
  folio: z.string().nullable().optional(),
});
