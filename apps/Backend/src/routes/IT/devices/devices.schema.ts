import { z } from 'zod';

export const editSchema = z.object({
  id: z.number(),
  name: z.string().optional().nullable(),
  ip: z.string().optional().nullable(),
  user: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  wifipw: z.string().optional().nullable(),
});

export const createSchema = z.object({
  name: z.string(),
  ip: z.string().optional().nullable(),
  user: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  wifipw: z.string().optional().nullable(),
});

export const deleteSchema = z.object({
  id: z.number(),
});
