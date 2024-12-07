import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { prisma } from "@/db";
import { notFound } from "next/navigation";

export default async function Layout({
	children,
}: { children: React.ReactNode }) {
	const session = await auth();

	if (!session) {
		return notFound();
	}

	const user = await prisma.user.findUnique({
		where: {
			id: session.user.id,
		},
	});

	if (!user) return notFound();

	return (
		<SidebarProvider>
			<AppSidebar user={user} />
			<main className="mx-auto">{children}</main>
		</SidebarProvider>
	);
}
