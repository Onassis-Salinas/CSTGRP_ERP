import { z } from 'zod';

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
  perm_it: z.number().min(0).max(2).optional(),
  perm_materialmovements: z.number().min(0).max(2).optional(),
  perm_inventorystats: z.number().min(0).max(2).optional(),
  perm_petitions: z.number().min(0).max(2).optional(),
  perm_requisitions: z.number().min(0).max(2).optional(),
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
  perm_it: z.number().min(0).max(2),
  perm_structure: z.number().min(0).max(2),
  perm_materialmovements: z.number().min(0).max(2),
  perm_inventorystats: z.number().min(0).max(2).optional(),
  perm_requisitions: z.number().min(0).max(2),
  perm_petitions: z.number().min(0).max(2),
  perm_assistance_areas: z.string().max(300).nullable(),
});

export const deleteSchema = z.object({
  id: z.number(),
});
