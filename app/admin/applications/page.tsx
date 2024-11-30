import { Skeleton } from "@/components/skeleton";
import { prisma } from "@/db";
import { Suspense } from "react";
import ApplicationsHeader from "./components/applications-header";
import ApplicationsPagination from "./components/applications-pagination";
import ApplicationsTable from "./components/applications-table";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ApplicationsPage({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const params = await searchParams;

	const search = typeof params.search === "string" ? params.search : "";
	const sort = typeof params.sort === "string" ? params.sort : "createdAt";
	const sortType =
		typeof params.sortType === "string" ? params.sortType : "desc";
	const page =
		typeof params.page === "string" ? Number.parseInt(params.page) : 1;

	const applications = await prisma.application.findMany({
		include: {
			job: {
				include: {
					company: true,
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
						company: {
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
						company: {
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
