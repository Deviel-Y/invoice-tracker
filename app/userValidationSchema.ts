import { z } from "zod";

export type UserType = z.infer<typeof userSchema>;

export const userSchema = z.object({
  email: z
    .string()
    .email({ message: "Enter valid type of email" })
    .min(6)
    .max(30),
  password: z.string().min(1, "Password is required").max(100),
});
