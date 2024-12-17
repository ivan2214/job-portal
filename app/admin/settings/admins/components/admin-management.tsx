import { Container } from "@/components/container";
import type { User } from "@prisma/client";
import { AddAdminModal } from "./add-admin-modal";
import { AdminSummary } from "./admin-summary";
import { AdminTable } from "./admin-table";
import { SearchBar } from "./search-bar";

export function AdminManagement({
	admins,
}: {
	admins: User[];
}) {
	return (
		<Container>
			<h1 className="mb-8 font-bold text-3xl">Admin Management</h1>
			<div className="mb-6 flex items-center justify-between">
				<SearchBar />
				<AddAdminModal />
			</div>
			<AdminSummary admins={admins} />
			<AdminTable admins={admins} />
		</Container>
	);
}
