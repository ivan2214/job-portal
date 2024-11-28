import { Container } from "@/components/container";
import { prisma } from "@/db";
import { notFound } from "next/navigation";
import ActionButtons from "./components/action-buttons";
import ApplicationList from "./components/application-list";
import JobDetails from "./components/job-details";
import JobStatistics from "./components/job-statistics";

export default async function JobManagementPage({
	params,
}: { params: { id: string } }) {
	const { id } = await params;
	const job = await prisma.job.findUnique({
		where: {
			id,
		},
		include: {
			applications: {
				include: {
					user: true,
				},
			},
		},
	});
	const applications = job?.applications || [];

	if (!job) {
		notFound();
	}

	return (
		<Container>
			<h1 className="mb-8 font-bold text-3xl">{job.title}</h1>
			<div className="grid gap-8 md:grid-cols-2">
				<div>
					<JobDetails job={job} />
					<JobStatistics job={job} />
					<ActionButtons jobId={job.id} />
				</div>
				<div>
					<ApplicationList applications={applications} />
				</div>
			</div>
		</Container>
	);
}
