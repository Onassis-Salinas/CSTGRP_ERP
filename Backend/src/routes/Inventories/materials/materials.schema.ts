import { z } from 'zod';

export const editSchema = z.object({
  id: z.number(),
  code: z.string().optional().optional(),
  location: z.string().optional().optional(),
  description: z.string().optional(),
  measurement: z.string().optional(),
  clientId: z.number().optional(),
  minAmount: z.string().optional(),
});

export const createSchema = z.object({
  code: z.string(),
  location: z.string(),
  description: z.string(),
  measurement: z.string(),
  clientId: z.number(),
  minAmount: z.string(),
});

export const deleteSchema = z.object({
  id: z.number(),
});
