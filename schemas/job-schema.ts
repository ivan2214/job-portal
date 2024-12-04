import { TypeJob } from "@prisma/client";
import { z } from "zod";

export const NewJobSchema = z.object({
	title: z.string().min(5, {
		message: "El título debe tener al menos 5 caracteres.",
	}),
	description: z.string().min(50, {
		message: "La descripción debe tener al menos 50 caracteres.",
	}),
	category: z.string({
		required_error: "Por favor seleccione una categoría.",
	}),
	location: z.string().min(3, {
		message: "Por favor ingrese una ubicación válida.",
	}),
	salary: z.string().regex(/^\d+$/, {
		message: "Por favor ingrese un salario válido (solo números).",
	}),
	requirements: z
		.array(z.object({ id: z.string(), text: z.string() }))
		.optional(),
	type: z.enum([
		TypeJob.CONTRACT,
		TypeJob.FULL_TIME,
		TypeJob.INTERN,
		TypeJob.OTHER,
		TypeJob.PART_TIME,
		TypeJob.PERMANENT,
		TypeJob.TEMPORARY,
		TypeJob.VOLUNTARY,
	]),

	contactInfo: z
		.object({
			email: z.string().email().optional(),
			phone: z.string().optional(),
			website: z.string().url().optional(),
			linkedin: z.string().url().optional(),
			facebook: z.string().url().optional(),
			instagram: z.string().url().optional(),
		})
		.optional(),
});
