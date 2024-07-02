import { z } from 'zod';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const weekSchema = z.object({
  date: z.string().refine((value) => dateRegex.test(value)),
});

export const getSingleSchema = z.object({
  id: z.number(),
});

export const editSchema = z.object({
  id: z.number(),
  incidenceId0: z.number().optional(),
  incidenceId1: z.number().optional(),
  incidenceId2: z.number().optional(),
  incidenceId3: z.number().optional(),
  incidenceId4: z.number().optional(),
});
