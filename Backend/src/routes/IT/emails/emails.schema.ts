import { z } from 'zod';

export const editSchema = z.object({
  id: z.number().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  employeeId: z.string().optional(),
});

export const createSchema = z.object({
  email: z.string(),
  password: z.string().optional(),
  employeeId: z.string().optional(),
});

export const deleteSchema = z.object({
  id: z.number(),
});
