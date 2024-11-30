import { prisma } from "@/db";
import { AdminManagement } from "./components/admin-management";

export default async function AdminPage() {
	const admins = await prisma.user.findMany({
		where: {
			role: "ADMIN",
		},
	});

	return <AdminManagement admins={admins} />;
}
