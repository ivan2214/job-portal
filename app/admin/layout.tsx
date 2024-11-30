import { auth } from "@/auth";
import { Sidebar } from "./components/sidebar";
import { notFound } from "next/navigation";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	const isAdmin = session?.user?.role === "ADMIN";

	if (!isAdmin) {
		return notFound();
	}
	return (
		<div className="flex min-h-screen bg-gray-100">
			<Sidebar />
			<div className="flex-1 overflow-auto">{children}</div>
		</div>
	);
}
