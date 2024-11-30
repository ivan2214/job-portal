"use server";

import type * as z from "zod";

import { ResetSchema } from "@/schemas/auth-schema";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
	const validatedFields = ResetSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Email invalido!" };
	}

	const { email } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser) {
		return { error: "Correo electrónico no encontrado!" };
	}

	const passwordResetToken = await generatePasswordResetToken(email);

	await sendPasswordResetEmail(
		passwordResetToken.email,
		passwordResetToken.token,
	);

	return { success: "Restablecer correo electrónico enviado!" };
};
