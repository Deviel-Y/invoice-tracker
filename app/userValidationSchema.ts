import { z } from "zod";

export type CreateUserType = z.infer<typeof createUserSchema>;

export const createUserSchema = z.object({
  email: z.string().email().min(6).max(30),
  password: z.string().min(1).max(100),
});
