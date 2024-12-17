"use server";

import { auth } from "@/auth";
import { prisma } from "@/db";
import { NewJobSchema } from "@/schemas/job-schema";
import type { Requirements } from "@prisma/client";
import type { z } from "zod";

export const newJob = async (values: z.infer<typeof NewJobSchema>) => {
	console.log(values);

	const validateFields = NewJobSchema.safeParse(values);

	if (!validateFields.success) {
		console.error(validateFields.error?.errors); // Muestra errores de validación
		return { error: "Campos invalidos!" };
	}
	const {
		category: categoryForm,
		description,
		location,
		salary,
		title,
		type,
		contactInfo,
		requirements: requerimentsForm,
	} = validateFields.data;

	const { email, phone, website, facebook, instagram, linkedin } =
		contactInfo || {};

	try {
		if (!categoryForm) {
			return { error: "Categoría no válida." };
		}
		const existingCategory = await prisma.categoryJob.findUnique({
			where: {
				name: categoryForm,
			},
		});

		const category = existingCategory
			? existingCategory
			: await prisma.categoryJob.create({
					data: {
						name: categoryForm,
					},
				});

		let requirements: Requirements[] | null = null;

		if (requerimentsForm && requerimentsForm.length > 0) {
			requirements = await Promise.all(
				requerimentsForm.map(async (requirementFormItem) => {
					const requirement = await prisma.requirements.create({
						data: {
							name: requirementFormItem.text,
							jobId: category?.id, // Aquí también valida `category.id`
						},
					});
					return requirement;
				}),
			);
		}

		const session = await auth();

		if (!session || !session.user?.id) {
			return { error: "No se pudo autenticar al usuario." };
		}

		const company = await prisma.company.findUnique({
			where: {
				userId: session?.user?.id,
			},
		});

		if (!company) {
			return { error: "La empresa no existe" };
		}

		const job = await prisma.job.create({
			data: {
				companyUserId: company.userId,
				title,
				description,
				categoryJobId: category?.id,
				location,
				salaryText: salary,
				requirements: requirements?.length
					? {
							connect: requirements.map((requirement) => ({
								id: requirement.id,
							})),
						}
					: undefined, // Evita pasar un valor vacío si no hay requisitos
			},
		});

		if (contactInfo) {
			await prisma.contactInfo.create({
				data: {
					email,
					phone,
					website,
					facebook,
					instagram,
					linkedin,
					jobId: job.id,
				},
			});
		}

		return {
			success: "Trabajo creado!",
		};
	} catch (error) {
		console.error(error);
		return { error: "Error al crear el trabajo" };
	}
};
