import { Suspense } from "react";
import { SearchBarAdminUser } from "./components/searchbar-admin-user";
import { UserTable } from "./components/user-table";

import { Container } from "@/components/container";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { prisma } from "@/db";
import { ChevronRight } from "lucide-react";
import { PaginationAdminUser } from "./components/pagination-admin-user";

type SearchParams = Promise<{
	query?: string;
	page?: string;
}>;

export default async function UserManagement({
	searchParams,
}: {
	searchParams?: SearchParams;
}) {
	const params = await searchParams;

	const query = params?.query || "";
	const currentPage = Number(params?.page) || 1;
	const pageSize = 10;

	const users = await prisma.user.findMany({
		where: {
			OR: [
				{
					name: {
						contains: query,
						mode: "insensitive",
					},
				},
				{
					email: {
						contains: query,
						mode: "insensitive",
					},
				},
			],
		},
		take: pageSize,
		skip: (currentPage - 1) * pageSize,
	});

	const total = await prisma.user.count({
		where: {
			OR: [
				{
					name: {
						contains: query,
						mode: "insensitive",
					},
				},
				{
					email: {
						contains: query,
						mode: "insensitive",
					},
				},
			],
		},
	});

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
			<div className="my-4">
				<SearchBarAdminUser />
			</div>
			<Suspense fallback={<div>Loading...</div>}>
				<UserTable users={users} />
			</Suspense>
			<div className="mt-4">
				<PaginationAdminUser totalPages={totalPages} />
			</div>
		</Container>
	);
}
