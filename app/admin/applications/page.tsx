import { Suspense } from "react";
import ApplicationsHeader from "./components/applications-header";
import ApplicationsTable from "./components/applications-table";
import ApplicationsPagination from "./components/applications-pagination";
import { Skeleton } from "@/components/skeleton";
import { prisma } from "@/db";

export default async function ApplicationsPage({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const search =
		typeof searchParams.search === "string" ? searchParams.search : "";
	const sort =
		typeof searchParams.sort === "string" ? searchParams.sort : "createdAt";
	const sortType =
		typeof searchParams.sortType === "string" ? searchParams.sortType : "desc";
	const page =
		typeof searchParams.page === "string"
			? Number.parseInt(searchParams.page)
			: 1;

	const applications = await prisma.application.findMany({
		include: {
			job: {
				include: {
					Company: true,
				},
			},
			user: true,
		},
		where: {
			OR: [
				{
					job: {
						title: {
							contains: search,
							mode: "insensitive",
						},
						Company: {
							name: {
								contains: search,
								mode: "insensitive",
							},
						},
					},
					user: {
						name: {
							contains: search,
							mode: "insensitive",
						},
					},
				},
			],
		},
		orderBy: {
			[sort]: sortType,
		},
		take: 10,
		skip: (page - 1) * 10,
	});

	// Obtén el total de aplicaciones para la paginación
	const totalApplications = await prisma.application.count({
		where: {
			OR: [
				{
					job: {
						title: {
							contains: search,
							mode: "insensitive",
						},
						Company: {
							name: {
								contains: search,
								mode: "insensitive",
							},
						},
					},
					user: {
						name: {
							contains: search,
							mode: "insensitive",
						},
					},
				},
			],
		},
	});

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="mb-8 font-bold text-3xl">Manage Job Applications</h1>
			<ApplicationsHeader initialSearch={search} initialSort={sort} />
			<Suspense fallback={<ApplicationsTableSkeleton />}>
				<ApplicationsTable applications={applications} />
			</Suspense>
			<ApplicationsPagination applicationsTotal={totalApplications} />
		</div>
	);
}

function ApplicationsTableSkeleton() {
	return (
		<div className="space-y-4">
			<Skeleton className="h-10 w-full" />
			<Skeleton className="h-20 w-full" />
			<Skeleton className="h-20 w-full" />
			<Skeleton className="h-20 w-full" />
			<Skeleton className="h-20 w-full" />
		</div>
	);
}
