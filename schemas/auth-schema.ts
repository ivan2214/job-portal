"use client";

import { z } from "zod";

export const FormLoginSchema = z.object({
	email: z.string().email({ message: "Correo electrónico inválido" }),
	password: z
		.string()
		.min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
	code: z.optional(z.string()),
});

export const FormRegisterSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(6, {
			message: "Minimum 6 characters required",
		}),
		confirmPassword: z.string().min(6, {
			message: "Minimum 6 characters required",
		}),
		fullName: z.string().min(1, {
			message: "Name es requerido",
		}),
		role: z.enum(["postulante", "empleador"], {
			required_error: "Debe seleccionar un rol",
		}),
	})
	.refine(
		(data) => {
			if (data.password !== data.confirmPassword) {
				return false;
			}

			return true;
		},
		{
			message: "Passwords do not match",
			path: ["confirmPassword"],
			params: {
				message: "Passwords do not match",
			},
		},
	);

export const ResetSchema = z.object({
	email: z.string().email(),
});

export const NewPasswordSchema = z.object({
	password: z.string().min(6, {
		message: "Minimum 6 characters required",
	}),
});
