import { UserStatus } from "@prisma/client";
import { z } from "zod";

export const FormEditUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  emailVerified: z.boolean().optional(),

  status: z
    .enum([
      UserStatus.ACTIVE,
      UserStatus.BANNED,
      UserStatus.BLOCKED,
      UserStatus.DEACTIVATED,
      UserStatus.DEACTIVATED_BY_ADMIN,
      UserStatus.DEACTIVATED_PERMANENTLY,
      UserStatus.DEACTIVATED_TEMPORARILY,
      UserStatus.DELETED,
      UserStatus.INACTIVE,
      UserStatus.SUSPENDED,
    ])
    .optional(),
});

export const FormChangeUserStatusSchema = z.object({
  status: z
    .enum([
      UserStatus.ACTIVE,
      UserStatus.BANNED,
      UserStatus.BLOCKED,
      UserStatus.DEACTIVATED,
      UserStatus.DEACTIVATED_BY_ADMIN,
      UserStatus.DEACTIVATED_PERMANENTLY,
      UserStatus.DEACTIVATED_TEMPORARILY,
      UserStatus.DELETED,
      UserStatus.INACTIVE,
      UserStatus.SUSPENDED,
    ])
    .optional(),
  id: z.string(),
});
