import { z } from "zod";

export type UserType = z.infer<typeof userSchema>;
export type SignUpUserType = z.infer<typeof signUpSchema>;

export const userSchema = z.object({
  email: z
    .string()
    .email({ message: "Enter valid type of email" })
    .min(6)
    .max(30),
  password: z.string().min(1, "Password is required").max(100),
});

export const signUpSchema = z
  .object({
    email: z.string().min(6).max(30).email(),
    password: z.string().min(1, "Password is required").max(100),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
