import type { NextAuthConfig } from "next-auth";

import bcrypt from "bcryptjs";

import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { getUserByEmail } from "@/data/user";
import { FormLoginSchema } from "./schemas/auth-schema";
import { RoleUser } from "@prisma/client";

export default {
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		GitHub({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,

			profile(profile) {
				return {
					id: String(profile.id),
					image: profile.avatar_url,
					email: profile.email,
					name: profile.name,
					role: RoleUser.USER,
				};
			},
		}),
		Credentials({
			async authorize(credentials) {
				const validateFields = FormLoginSchema.safeParse(credentials);

				if (validateFields.success) {
					const { email, password } = validateFields.data;

					const user = await getUserByEmail(email);

					if (!user || !user.hashedPassword) return null;

					const passwordMatch = await bcrypt.compare(
						password,
						user.hashedPassword,
					);

					if (passwordMatch) return user;
				}

				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
