import { Container } from "@/components/container";
import { prisma } from "@/db";
import { Suspense } from "react";
import { JobsDataTable } from "./components/jobs-data-table";
import { JobsHeader } from "./components/jobs-header";

type SearchParams = Promise<{
	query?: string;
	page?: string;
}>;

export default async function JobsPage({
	searchParams,
}: {
	searchParams?: SearchParams;
}) {
	const params = await searchParams;

	const query = params?.query || "";
	const currentPage = Number(params?.page) || 1;
	const pageSize = 10;

	const jobs = await prisma.job.findMany({
		where: {
			OR: [
				{
					title: {
						contains: query,
						mode: "insensitive",
					},
				},
				{
					company: {
						name: {
							contains: query,
							mode: "insensitive",
						},
					},
				},
			],
		},
		take: pageSize,
		skip: (currentPage - 1) * pageSize,
		include: {
			company: true,
			applications: true,
		},
	});

	const total = await prisma.job.count({
		where: {
			OR: [
				{
					title: {
						contains: query,
						mode: "insensitive",
					},
				},
				{
					company: {
						name: {
							contains: query,
							mode: "insensitive",
						},
					},
				},
			],
		},
		take: pageSize,
		skip: (currentPage - 1) * pageSize,
	});

	const totalPages = Math.ceil(total / pageSize);

	return (
		<Container className="space-y-8">
			<JobsHeader />

			<Suspense fallback={<div>Loading...</div>}>
				<JobsDataTable jobs={jobs} />
			</Suspense>
		</Container>
	);
}
