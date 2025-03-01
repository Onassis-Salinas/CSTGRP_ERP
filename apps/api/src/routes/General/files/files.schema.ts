import { z } from 'zod';

export const fileSchema = z.object({
  file: z.string(),
});
