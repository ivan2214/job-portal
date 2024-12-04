"use server";
import { signIn } from "@/auth";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getTwofactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { prisma } from "@/db";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import {
	generateTwoFactorToken,
	generateVerificationToken,
} from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { FormLoginSchema } from "@/schemas/auth-schema";
import { AuthError } from "next-auth";
import type * as z from "zod";

export const login = async (
	values: z.infer<typeof FormLoginSchema>,
	callbackUrl?: string | null,
) => {
	const validateFields = FormLoginSchema.safeParse(values);

	if (!validateFields.success) return { error: "Campos invalidos!" };
	const { email, password, code } = validateFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser || !existingUser.hashedPassword || !existingUser.email) {
		return { error: "El correo electrónico no existe.!" };
	}

	if (existingUser.role !== "ADMIN") {
		if (!existingUser.emailVerified) {
			const verificationToken = await generateVerificationToken(
				existingUser.email,
			);

			await sendVerificationEmail(
				verificationToken.email,
				verificationToken.token,
			);

			return { success: "Correo electrónico de confirmación enviado!" };
		}

		if (existingUser.isTwoFactorEnabled && existingUser.email) {
			if (code) {
				const twoFactorToken = await getTwofactorTokenByEmail(
					existingUser.email,
				);

				if (!twoFactorToken || twoFactorToken.token !== code) {
					return { error: "Código inválido!" };
				}

				const hasExpired = new Date(twoFactorToken.expires) <= new Date();

				if (hasExpired) {
					return { error: "código expirado!" };
				}

				await prisma.twoFactorToken.delete({
					where: {
						id: twoFactorToken.id,
					},
				});

				const existingConfirmation = await getTwoFactorConfirmationByUserId(
					existingUser.id,
				);

				if (existingConfirmation) {
					await prisma.twoFactorConfirmation.delete({
						where: {
							id: existingConfirmation.id,
						},
					});
				}

				await prisma.twoFactorConfirmation.create({
					data: {
						userId: existingUser.id,
					},
				});
			} else {
				const twoFactorToken = await generateTwoFactorToken(existingUser.email);

				await sendTwoFactorTokenEmail(
					twoFactorToken.email,
					twoFactorToken.token,
				);

				return { twoFactor: true };
			}
		}
	}

	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo:
				callbackUrl || existingUser.role !== "ADMIN"
					? DEFAULT_LOGIN_REDIRECT
					: "/admin",
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Credenciales inválidas!" };
				case "CallbackRouteError":
					return { error: "Credenciales inválidas!" };
				case "AccessDenied":
					return { error: "Por favor verifique su correo electrónico" };
				default:
					return { error: "Algo salió mal" };
			}
		}
		throw error;
	}
};
