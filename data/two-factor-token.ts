import { prisma } from "@/db";

export const getTwofactorTokenByToken = async (token: string) => {
	try {
		const twoFactorToken = await prisma.twoFactorToken.findUnique({
			where: {
				token,
			},
		});

		return twoFactorToken;
	} catch {
		return null;
	}
};

export const getTwofactorTokenByEmail = async (email: string) => {
	try {
		const twoFactorToken = await prisma.twoFactorToken.findFirst({
			where: {
				email,
			},
		});

		return twoFactorToken;
	} catch {
		return null;
	}
};
