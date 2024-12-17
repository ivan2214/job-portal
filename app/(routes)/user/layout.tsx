import { auth } from "@/auth";
import { RoleUser } from "@prisma/client";
import { notFound } from "next/navigation";
import { Sidebar } from "./components/sidebar";

export default async function UserLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	const isUser = session?.user?.role === RoleUser.USER;

	if (!isUser || !session) {
		return notFound();
	}

	return (
		<div className="flex min-h-screen bg-gray-100">
			<Sidebar />
			<main className="flex-1 overflow-y-auto">{children}</main>
		</div>
	);
}
