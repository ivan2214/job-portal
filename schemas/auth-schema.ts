"use client";

import { z } from "zod";

export const FormLoginSchema = z.object({
	email: z.string().email({ message: "Correo electrónico inválido" }),
	password: z
		.string()
		.min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});

export const FormRegisterSchema = z.object({
	email: z.string().email({ message: "Correo electrónico inválido" }),
	password: z
		.string()
		.min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
	confirmPassword: z
		.string()
		.min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
	name: z
		.string()
		.min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
	role: z.enum(["postulante", "empleador"], {
		required_error: "Debe seleccionar un rol",
	}),
});
