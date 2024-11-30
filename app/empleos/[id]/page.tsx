import { Container } from "@/components/container";
import { prisma } from "@/db";
import { notFound } from "next/navigation";
import ActionButtons from "./components/action-button";
import JobDetails from "./components/job-details";

export default async function JobPostingPage({
	params,
}: { params: { id: string } }) {
	const { id } = await params;

	const job = await prisma.job.findUnique({
		where: {
			id: id,
		},
		include: {
			company: true,
			contactInfo: true,
			categoryJob: true,
			requirements: true,
		},
	});

	console.log(job);

	if (!job) {
		notFound();
	}

	return (
		<Container>
			<header className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="mb-2 font-bold text-3xl">{job.title}</h1>
					<p className="text-muted-foreground text-xl">{job.company?.name}</p>
				</div>
			</header>

			<JobDetails job={job} />

			<ActionButtons jobId={job.id} />
		</Container>
	);
}
