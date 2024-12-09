import { Container } from "@/components/container";
import { JobCard } from "@/components/job-card";
import { Pagination } from "@/components/pagination";
import { Sidebar } from "@/components/sidebar";
import { prisma } from "@/db";

type SearchParams = Promise<{
	page?: string;
	category?: string;
	query?: string;
	location?: string;
	sort?: string;
}>;

export default async function JobListings({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const params = await searchParams;

	const { page, category, query, location, sort } = params;

	const jobListings = await prisma.job.findMany({
		where: {
			title: {
				contains: query || "",
				mode: "insensitive",
			},
			categoryJob: {
				name: {
					contains: category || "",
					mode: "insensitive",
				},
			},
			location: {
				contains: location || "",
				mode: "insensitive",
			},
		},
		orderBy: {
			createdAt: "desc",
		},
		skip: (Number(page || 1) - 1) * 10,
		take: 10,
		include: {
			categoryJob: true,
			company: true,
		},
	});

	return (
		<Container className="px-4 py-8 sm:px-6 lg:px-8">
			<h1 className="mb-6 font-bold text-3xl">Ofertas de Empleo</h1>
			<div className="flex flex-col gap-8 md:flex-row">
				<Sidebar />
				<div className="flex-1">
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{jobListings.map((job) => (
							<JobCard key={job.title} job={job} />
						))}
					</div>
					<Pagination />
				</div>
			</div>
		</Container>
	);
}
