import { z } from 'zod';

export const editSchema = z.object({
  id: z.number().optional(),
  anydesk: z.string().optional(),
  active: z.boolean().optional(),
  lastMaintance: z.string().optional(),
  employeeId: z.string().optional(),
  password: z.string().optional(),
});

export const createSchema = z.object({
  anydesk: z.string().optional(),
  active: z.boolean().optional(),
  lastMaintance: z.string().optional(),
  employeeId: z.string().optional(),
  password: z.string().optional(),
});

export const deleteSchema = z.object({
  id: z.number(),
});
