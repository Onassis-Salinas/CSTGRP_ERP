import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const editSchema = z.object({
  id: z.number().optional(),
  username: z.string().optional(),
  password: z.string().min(3).optional(),
  perm_users: z.number().min(0).max(2).optional(),
  perm_assistance: z.number().min(0).max(2).optional(),
  perm_employees: z.number().min(0).max(2).optional(),
  perm_productivity: z.number().min(0).max(2).optional(),
  perm_inventory: z.number().min(0).max(2).optional(),
  perm_structure: z.number().min(0).max(2).optional(),
  perm_materials: z.number().min(0).max(2).optional(),
  perm_assistance_areas: z.string().max(300).optional().nullable(),
});

export const registerSchema = z.object({
  username: z.string(),
  password: z.string().min(3),
  perm_users: z.number().min(0).max(2),
  perm_assistance: z.number().min(0).max(2),
  perm_employees: z.number().min(0).max(2),
  perm_productivity: z.number().min(0).max(2),
  perm_inventory: z.number().min(0).max(2),
  perm_structure: z.number().min(0).max(2),
  perm_materials: z.number().min(0).max(2),
  perm_assistance_areas: z.string().max(300).nullable(),
});

export const deleteSchema = z.object({
  id: z.number(),
});
