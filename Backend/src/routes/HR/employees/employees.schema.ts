import { z } from 'zod';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const rfcRegex =
  /^([A-ZÑ\x26]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})$/; // homoclave requerida
const curpRegex =
  /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0\d|1[0-2])(?:[0-2]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
const bloodRegex = /^[AO][B]?[+-]$/;
const nssRegex = /^[0-9]{11}$/;
const accountRegex = /^[0-9]{10}$/;

export const createSchema = z.object({
  noEmpleado: z.number().min(10000).max(99999),
  name: z.string().min(3),
  areaId: z.number(),
  paternalLastName: z.string().min(3).optional().nullable(),
  maternalLastName: z.string().min(3).optional().nullable(),
  nss: z
    .string()
    .refine((value) => nssRegex.test(value))
    .optional()
    .nullable(),
  curp: z
    .string()
    .refine((value) => curpRegex.test(value))
    .optional()
    .nullable(),
  rfc: z
    .string()
    .refine((value) => rfcRegex.test(value))
    .optional()
    .nullable(),
  blood: z
    .string()
    .refine((value) => bloodRegex.test(value))
    .optional()
    .nullable(),
  account: z
    .string()
    .refine((value) => accountRegex.test(value))
    .optional()
    .nullable(),
  emergencyContact: z.string().min(1).optional().nullable(),
  emergencyNumber: z.string().min(1).optional().nullable(),
  admissionDate: z.string().refine((value) => dateRegex.test(value)),
  bornLocation: z.string().min(1).optional().nullable(),
  genre: z.string().min(1).optional().nullable(),
  sons: z.number().optional().nullable(),
  clinicNo: z.string().min(1).optional().nullable(),
  email: z.string().email().optional().nullable(),
  number: z.string().min(1).optional().nullable(),
  direction: z.string().min(1).optional().nullable(),
  bank: z.string().min(1).optional().nullable(),
  infonavitNo: z.string().min(1).optional().nullable(),
  infonavitFee: z.string().min(1).optional().nullable(),
  infonavitDiscount: z.string().min(1).optional().nullable(),
  positionType: z.string().min(1).optional().nullable(),
  cim: z
    .string()
    .refine((value) => dateRegex.test(value))
    .optional()
    .nullable(),
  shift: z.string().min(1).optional().nullable(),
  nominaSalary: z.number().min(0).optional().nullable(),
  immsSalary: z.number().min(0).optional().nullable(),
  studies: z.string().min(1).optional().nullable(),
  bornDate: z
    .string()
    .refine((value) => dateRegex.test(value))
    .optional()
    .nullable(),
  civilStatus: z.string().min(1).optional().nullable(),
  nationality: z.string().min(1).optional().nullable(),
  positionId: z.number(),
});

export const editSchema = z.object({
  id: z.number(),
  noEmpleado: z.number().min(10000).max(99999).optional().nullable(),
  name: z.string().min(3).optional(),
  paternalLastName: z.string().min(3).optional().nullable(),
  maternalLastName: z.string().min(3).optional().nullable(),
  nss: z
    .string()
    .refine((value) => nssRegex.test(value))
    .optional()
    .nullable(),
  curp: z
    .string()
    .refine((value) => curpRegex.test(value))
    .optional()
    .nullable(),
  rfc: z
    .string()
    .refine((value) => rfcRegex.test(value))
    .optional()
    .nullable(),
  blood: z
    .string()
    .refine((value) => bloodRegex.test(value))
    .optional()
    .nullable(),
  account: z
    .string()
    .refine((value) => accountRegex.test(value))
    .optional()
    .nullable(),
  emergencyContact: z.string().min(1).optional().nullable(),
  emergencyNumber: z.string().min(1).optional().nullable(),
  admissionDate: z
    .string()
    .refine((value) => dateRegex.test(value))
    .optional()
    .nullable(),
  bornLocation: z.string().min(1).optional().nullable(),
  genre: z.string().min(1).optional().nullable(),
  sons: z.number().optional().nullable(),
  clinicNo: z.string().min(1).optional().nullable(),
  email: z.string().email().optional().nullable(),
  number: z.string().min(1).optional().nullable(),
  direction: z.string().min(1).optional().nullable(),
  bank: z.string().min(1).optional().nullable(),
  infonavitNo: z.string().min(1).optional().nullable(),
  infonavitFee: z.string().min(1).optional().nullable(),
  infonavitDiscount: z.string().min(1).optional().nullable(),
  positionType: z.string().min(1).optional().nullable(),
  cim: z
    .string()
    .refine((value) => dateRegex.test(value))
    .optional()
    .nullable(),
  shift: z.string().min(1).optional().nullable(),
  nominaSalary: z.number().min(0).optional().nullable(),
  immsSalary: z.number().min(0).optional().nullable(),
  studies: z.string().min(1).optional().nullable(),
  bornDate: z
    .string()
    .refine((value) => dateRegex.test(value))
    .optional()
    .nullable(),
  civilStatus: z.string().min(1).optional().nullable(),
  nationality: z.string().min(1).optional().nullable(),
  positionId: z.number().optional().nullable(),
  areaId: z.number().optional().nullable(),
  quitDate: z
    .string()
    .refine((value) => dateRegex.test(value))
    .optional()
    .nullable(),
  quitStatus: z.string().min(1).optional().nullable(),
  quitNotes: z.string().optional().optional().nullable(),
  quitReason: z.string().min(1).optional().nullable(),
});

export const reactivateSchema = z.object({
  id: z.number().min(1),
  admissionDate: z.string().refine((value) => dateRegex.test(value)),
  areaId: z.number(),
  positionId: z.number(),
});

export const quitSchema = z.object({
  id: z.number().min(1),
  quitDate: z.string().refine((value) => dateRegex.test(value)),
  quitStatus: z.string().min(1),
  quitNotes: z.string().optional().nullable(),
  quitReason: z.string().min(1),
});

export const templateSchema = z.object({
  template: z.number().min(1),
});

export const idSchema = z.object({
  id: z.string().min(1),
});
