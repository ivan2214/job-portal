"use server";

import { prisma } from "@/db";
import { FormEditUserSchema } from "@/schemas/user";
import type { RoleUser, UserStatus } from "@prisma/client";
import type { z } from "zod";

export const updateUserStatus = async (id: string, status: UserStatus) => {
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};

export const deleteUser = async (id: string) => {
  await prisma.user.delete({
    where: {
      id,
    },
  });
};

export const updateUserRole = async (id: string, role: RoleUser) => {
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
  });
};

export const editUser = async (values: z.infer<typeof FormEditUserSchema>) => {
  const validateFields = FormEditUserSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Campos invalidos!" };
  }

  const { email, emailVerified, image, name, status } = validateFields.data;

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      emailVerified,
      image,
      name,
      status,
    },
  });
};
