"use client";

import { useSession } from "next-auth/react";

interface AuthCheckProps {
	children: React.ReactNode;
	fallback: React.ReactNode;
}

export function AuthCheck({ children, fallback }: AuthCheckProps) {
	const { data: session } = useSession();

	if (!session) {
		return <>{fallback}</>;
	}

	return <>{children}</>;
}
