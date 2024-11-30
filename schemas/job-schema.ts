import { z } from "zod";

export const NewJobSchema = z.object({
	titulo: z.string().min(5, {
		message: "El título debe tener al menos 5 caracteres.",
	}),
	descripcion: z.string().min(50, {
		message: "La descripción debe tener al menos 50 caracteres.",
	}),
	categoria: z.string({
		required_error: "Por favor seleccione una categoría.",
	}),
	ubicacion: z.string().min(3, {
		message: "Por favor ingrese una ubicación válida.",
	}),
	salario: z.string().regex(/^\d+$/, {
		message: "Por favor ingrese un salario válido (solo números).",
	}),
	requisitos: z
		.array(z.object({ id: z.string(), text: z.string() }))
		.optional(),
});
