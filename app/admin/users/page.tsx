import { Suspense } from "react";
import { Pagination } from "./components/pagination";
import { SearchBar } from "./components/search-bar";
import { UserTable } from "./components/user-table";
import { getUsers } from "./data";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/container";

export default async function UserManagement({
	searchParams,
}: {
	searchParams?: { query?: string; page?: string };
}) {
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;
	const pageSize = 10;

	const { users, total } = await getUsers(query, currentPage, pageSize);
	const totalPages = Math.ceil(total / pageSize);

	return (
		<Container>
			<h1 className="mb-5 font-bold text-2xl">User Management</h1>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<ChevronRight className="h-4 w-4" />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbLink href="/admin/users">Users</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div className="mb-4">
				<SearchBar />
			</div>
			<Suspense fallback={<div>Loading...</div>}>
				<UserTable users={users} />
			</Suspense>
			<div className="mt-4">
				<Pagination totalPages={totalPages} />
			</div>
		</Container>
	);
}
