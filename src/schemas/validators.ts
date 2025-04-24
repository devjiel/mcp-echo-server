import { z } from 'zod';

// Zod schemas for input validation

export const EchoArgumentsSchema = z.object({
  text: z.string(),
});