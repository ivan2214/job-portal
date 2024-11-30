import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { RoleUser } from "@prisma/client";
import NextAuth from "next-auth";
import { getAccountByUserId } from "./data/accounts";
import { getUserById } from "./data/user";
import { prisma } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
	pages: {
		signIn: "/auth/login",
		error: "/auth/error",
	},

	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider !== "credentials") return true;
			const existingUser = await getUserById(user.id);

			if (!existingUser?.emailVerified) {
				return false;
			}

			return true;
		},
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			if (token.role && session.user) {
				session.user.role = token.role as RoleUser;
			}

			if (session.user) {
				session.user.name = token.name as string;
				session.user.email = token.email as string;
			}

			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;
			const existingUser = await getUserById(token.sub);

			if (!existingUser) {
				return token;
			}
			const existingAccount = await getAccountByUserId(existingUser.id);

			token.isOAuth = !!existingAccount;
			token.name = existingUser.name;
			token.email = existingUser.email;
			token.role = existingUser.role;

			return token;
		},
	},
	adapter: PrismaAdapter(prisma),
	session: { strategy: "jwt" },
	secret: process.env.AUTH_SECRET,
	...authConfig,
});
