"use server";
import { auth } from "@/auth";
import { prisma } from "@/db";
import {
  type FormChangeUserStatusSchema,
  FormEditUserSchema,
} from "@/schemas/user";
import type { RoleUser } from "@prisma/client";
import { revalidatePath } from "next/cache";
import type { z } from "zod";

export const changeUserStatus = async (
  status: z.infer<typeof FormChangeUserStatusSchema>,
  redirectUrl?: string
) => {
  try {
    const { id, status: statusUser } = status;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return {
        error: "User not found",
      };
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        status: statusUser,
      },
    });

    return {
      success: "User status updated successfully",
    };
  } catch (error) {
    return {
      error: "Error updating user",
    };
  } finally {
    revalidatePath(redirectUrl || "/admin");
  }
};

export const deleteUser = async (id: string, redirectUrl?: string) => {
  if (!id) {
    return {
      error: "ID is required",
    };
  }

  try {
    // validacion para no poder eliminarte a vos mismo ni a un admin

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    console.log({
      user,
    });

    if (!user) {
      return {
        error: "User not found",
      };
    }

    if (user.role === "ADMIN") {
      return {
        error: "You cannot delete an admin",
      };
    }

    // validacion para no poder eliminarte vos mismo

    const sessionUser = await auth();

    if (!sessionUser) {
      return {
        error: "You are not logged in",
      };
    }

    if (sessionUser.user.id === id) {
      return {
        error: "You cannot delete yourself",
      };
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return {
      success: "User deleted successfully!",
    };
  } catch (error) {
    return {
      error: "Error deleting user",
    };
  } finally {
    revalidatePath(redirectUrl || "/admin");
  }
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

export const editUser = async (
  values: z.infer<typeof FormEditUserSchema>,
  redirectUrl?: string
) => {
  const validateFields = FormEditUserSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Campos invalidos!" };
  }

  const { email, emailVerified, name, status } = validateFields.data;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        error: "User not found",
      };
    }

    if (user.role === "ADMIN") {
      return {
        error: "You cannot edit an admin",
      };
    }

    if (user.email !== email) {
      const userExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (userExists) {
        return {
          error: "Email already exists",
        };
      }
    }

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        emailVerified: emailVerified ? new Date() : null,
        name,
        email,
        status,
      },
    });

    return {
      success: "User updated successfully!",
    };
  } catch (error) {
    return {
      error: "Error updating user",
    };
  } finally {
    revalidatePath(redirectUrl || "/admin");
  }
};
