import { z } from "zod";

export type UserType = z.infer<typeof userSchema>;
export type SignUpUserType = z.infer<typeof signUpSchema>;
export type UpdateUserInfoType = z.infer<typeof updateUserInfoSchema>;
export type ForgetPasswordSchemaType = z.infer<typeof forgetPasswordSchema>;

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

export const forgetPasswordSchema = z
  .object({
    email: z
      .string()
      .min(3)
      .max(30)
      .email({ message: "Enter valid Email Address" }),
    newPassword: z
      .string()
      .min(1, "Password is required")
      .max(100)
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .optional(),
    confirmPassword: z
      .string()
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const updateUserInfoSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: "Firstname must be at least 3 characters long" })
    .max(50)
    .optional()
    .or(z.literal(""))
    .refine((value) => !/\s/.test(value!), {
      message: "firstname must not contain space",
    }),
  lastname: z
    .string()
    .min(3, { message: "Lastname must be at least 3 characters long" })
    .max(50)
    .optional()
    .or(z.literal(""))
    .refine((value) => !/\s/.test(value!), {
      message: "Lastname must not contain space",
    }),
  email: z.string().email().min(6).max(30).optional(),
  role: z.enum(["USER", "ADMIN"]).optional(),
  currentPassword: z
    .string()
    .min(5, "Password must contain at least 5 characters")
    .max(100)
    .optional()
    .or(z.literal("")),
  newPassword: z
    .string()
    .min(5, "Password must contain at least 5 characters")
    .max(100)
    .optional()
    .or(z.literal("")),
  image: z.string().optional().nullable(),
});
