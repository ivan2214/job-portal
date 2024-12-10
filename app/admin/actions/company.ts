"use server";
import { auth } from "@/auth";
import { prisma } from "@/db";
import { FormEditCompanySchema } from "@/schemas/company";

import { revalidatePath } from "next/cache";
import type { z } from "zod";

export const deleteCompany = async (id: string, redirectUrl?: string) => {
  if (!id) {
    return {
      error: "ID is required",
    };
  }

  try {
    // validacion para no poder eliminarte a vos mismo ni a un admin

    const company = await prisma.company.findUnique({
      where: {
        userId: id,
      },
    });

    if (!company) {
      return {
        error: "Company not found",
      };
    }

    // validacion para no poder eliminarte vos mismo

    const sessionCompany = await auth();

    if (!sessionCompany) {
      return {
        error: "You are not logged in",
      };
    }

    if (sessionCompany.user?.id === id) {
      return {
        error: "You cannot delete yourself",
      };
    }

    await prisma.company.delete({
      where: {
        userId: id,
      },
    });

    return {
      success: "Company deleted successfully",
    };
  } catch (error) {
    return {
      error: "Error deleting company",
    };
  } finally {
    revalidatePath(redirectUrl || "/admin");
  }
};

export const editCompany = async (
  values: z.infer<typeof FormEditCompanySchema>,
  redirectUrl?: string
) => {
  const validateFields = FormEditCompanySchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Campos invalidos!" };
  }

  const {
    email,
    emailVerified,
    name,
    status,
    bio,
    description,
    location,
    logo,
    phone,
  } = validateFields.data;

  try {
    const company = await prisma.company.findUnique({
      where: {
        email,
      },
    });

    if (!company) {
      return {
        error: "Company not found",
      };
    }

    if (company.email !== email) {
      const companyExists = await prisma.company.findUnique({
        where: {
          email,
        },
      });

      if (companyExists) {
        return {
          error: "Email already exists",
        };
      }
    }

    await prisma.company.update({
      where: {
        email,
      },
      data: {
        bio,
        description,
        location,
        logo,
        phone,
        name,
        email,
        user: {
          update: {
            emailVerified: emailVerified ? new Date() : null,
            status,
          },
        },
      },
    });

    return {
      success: "Company updated successfully!",
    };
  } catch (error) {
    return {
      error: "Error updating company",
    };
  } finally {
    revalidatePath(redirectUrl || "/admin");
  }
};
