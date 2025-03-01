import { z } from 'zod';

export const editSchema = z.object({
  id: z.number().optional().nullable(),
  anydesk: z.string().optional().nullable(),
  anydeskPW: z.string().optional().nullable(),
  owner: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  lastMaintance: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
});

export const createSchema = z.object({
  anydesk: z.string().optional().nullable(),
  anydeskPW: z.string().optional().nullable(),
  owner: z.string().optional().nullable(),
  name: z.string(),
  active: z.boolean(),
  lastMaintance: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
});

export const deleteSchema = z.object({
  id: z.number(),
});
