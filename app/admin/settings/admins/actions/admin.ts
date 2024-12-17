"use server";
import { auth } from "@/auth";
import { prisma } from "@/db";
import { FormEditAdminSchema, FormNewAdminSchema } from "@/schemas/admin";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import type { z } from "zod";

export const addNewAdmin = async (
	values: z.infer<typeof FormNewAdminSchema>,
) => {
	const validateFields = FormNewAdminSchema.safeParse(values);

	if (!validateFields.success) return { error: "Campos invalidos!" };

	const { email, password, role, image, name } = validateFields.data;

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		await prisma.user.create({
			data: {
				name,
				email,
				hashedPassword,
				role,
				image,
				emailVerified: new Date(),
				status: "ACTIVE",
			},
		});

		return { message: "Admin creado con exito!" };
	} catch (error) {
		console.error(error);
		return { error: "Error al crear el admin" };
	} finally {
		prisma.$disconnect();
		revalidatePath("/admin/settings/admins");
	}
};

export const deleteAdmin = async (id: string, redirectUrl?: string) => {
	try {
		if (!id) {
			return { error: "ID is required" };
		}

		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		if (!user) {
			return { error: "Admin no encontrado" };
		}

		const session = await auth();

		if (session?.user.id === id) {
			return { error: "No puedes eliminar tu propia cuenta" };
		}

		const sessionUser = await prisma.user.findUnique({
			where: {
				id: session?.user.id,
			},
		});

		if (sessionUser?.role !== "ADMIN") {
			return { error: "No tienes permiso para eliminar admins" };
		}

		await prisma.user.delete({
			where: {
				id,
			},
		});
		return { success: "Admin eliminado con exito!" };
	} catch (error) {
		console.error(error);
		return { error: "Error al eliminar el admin" };
	} finally {
		prisma.$disconnect();
		revalidatePath(redirectUrl ?? "/admin/settings/admins");
	}
};

export const editAdmin = async (
	values: z.infer<typeof FormEditAdminSchema>,
	redirectUrl?: string,
) => {
	const validateFields = FormEditAdminSchema.safeParse(values);

	if (!validateFields.success) return { error: "Campos invalidos!" };

	const { id, email, password, role, image, name } = validateFields.data;

	try {
		await prisma.user.update({
			where: {
				id,
			},
			data: {
				name,
				email,
				role,
				image,
			},
		});

		return { success: "Admin actualizado con exito!" };
	} catch (error) {
		console.error(error);
		return { error: "Error al actualizar el admin" };
	} finally {
		prisma.$disconnect();
		revalidatePath(redirectUrl ?? "/admin/settings/admins");
	}
};
