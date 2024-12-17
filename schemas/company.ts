import { UserStatus } from "@prisma/client";
import { z } from "zod";

export const FormEditCompanySchema = z.object({
	name: z.string().optional(),
	email: z.string().email().optional(),
	emailVerified: z.boolean().optional(),
	description: z.string().optional(),
	location: z.string().optional(),
	logo: z.string().url().optional(),
	phone: z.string().optional(),
	bio: z.string().optional(),
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
