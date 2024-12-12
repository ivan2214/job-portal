"use server";
import { prisma } from "@/db";
import { FormNewAdminSchema } from "@/schemas/admin";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import type { z } from "zod";

export const addNewAdmin = async (
  values: z.infer<typeof FormNewAdminSchema>
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
