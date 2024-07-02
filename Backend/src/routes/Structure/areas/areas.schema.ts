import { z } from 'zod';

export const editSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  captured: z.boolean().optional(),
});

export const createSchema = z.object({
  name: z.string(),
  captured: z.boolean(),
});

export const deleteSchema = z.object({
  id: z.number(),
});
