import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { JobCardApplied } from "./components/job-card-applied";
import { prisma } from "@/db";

export default async function AppliedJobs({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const { page, status, location, search } = await searchParams;

	const jobs = await prisma.job.findMany({
		where: {
			OR: [
				{
					title: {
						contains: search as string,
					},
				},
				{
					company: {
						name: {
							contains: search as string,
						},
					},
				},
			],
		},
		include: {
			company: true,
			applications: true,
		},
	});

	const locations = ["All", ...new Set(jobs.map((job) => job.location))];

	return (
		<Container>
			<h1 className="mb-8 font-bold text-3xl">Applied Jobs</h1>

			<div className="mb-6 flex flex-col gap-4 md:flex-row">
				<Input type="text" placeholder="Search jobs..." className="flex-grow" />
				<Select>
					<SelectTrigger className="w-full md:w-[180px]">
						<SelectValue placeholder="Filter by status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="All">All Statuses</SelectItem>
						<SelectItem value="Pending">Pending</SelectItem>
						<SelectItem value="Accepted">Accepted</SelectItem>
						<SelectItem value="Rejected">Rejected</SelectItem>
					</SelectContent>
				</Select>
				<Select>
					<SelectTrigger className="w-full md:w-[180px]">
						<SelectValue placeholder="Filter by location" />
					</SelectTrigger>
					<SelectContent>
						{locations.map((location) => (
							<SelectItem key={location} value={location}>
								{location}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{jobs.length > 0 ? (
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{jobs.map((job) => (
						<JobCardApplied key={job.id} job={job} />
					))}
				</div>
			) : (
				<div className="py-12 text-center">
					<svg
						className="mx-auto h-12 w-12 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							vectorEffect="non-scaling-stroke"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
						/>
					</svg>
					<h3 className="mt-2 font-medium text-gray-900 text-sm">
						No applications
					</h3>
					<p className="mt-1 text-gray-500 text-sm">
						Get started by applying to your first job.
					</p>
					<div className="mt-6">
						<Button>Find Jobs</Button>
					</div>
				</div>
			)}
		</Container>
	);
}
