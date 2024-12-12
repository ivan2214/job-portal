import { z } from "zod";

export const FormNewAdminSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().email().max(50),
    image: z.string().optional(),
    password: z.string().min(4).max(20),
    confirmPassword: z.string().min(4).max(20),
    role: z.enum(["ADMIN"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contrasenas no coinciden",
    path: ["confirmPassword"],
  });

export const FormEditAdminSchema = z
  .object({
    id: z.string(),
    name: z.string().optional(),
    email: z.string().email().max(50),
    image: z.string().optional(),
    password: z.string().min(4).max(20).optional(),
    confirmPassword: z.string().min(4).max(20).optional(),
    role: z.enum(["ADMIN"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contrasenas no coinciden",
    path: ["confirmPassword"],
  });
