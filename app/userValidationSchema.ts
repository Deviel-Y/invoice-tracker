import { z } from "zod";

export type UserType = z.infer<typeof userSchema>;
export type SignUpUserType = z.infer<typeof signUpSchema>;
export type updateUserInfoType = z.infer<typeof updateUserInfoSchema>;

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

export const updateUserInfoSchema = z.object({
  firstname: z.string().max(50),
  lastname: z.string().max(50),
  email: z.string().email().min(6).max(30).optional(),
  role: z.enum(["USER", "ADMIN"]).optional(),
  currentPassword: z
    .string()
    .min(1, "Password is required")
    .max(100)
    .optional(),
  newPassword: z.string().optional(),
});
