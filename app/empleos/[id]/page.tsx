import { Container } from "@/components/container";
import { prisma } from "@/db";
import { notFound } from "next/navigation";
import ActionButtons from "./components/action-button";
import EmployerInfo from "./components/employer-info";
import JobDetails from "./components/job-details";

export default async function JobPostingPage({
	params,
}: { params: { id: string } }) {
	const { id } = await params;

	const jobData = await prisma.job.findUnique({
		where: {
			id: id,
		},
		include: {
			company: true,
		},
	});

	if (!jobData) {
		notFound();
	}

	return (
		<Container>
			<h1 className="mb-8 text-center font-bold text-4xl">{jobData.title}</h1>

			<div className="mb-8 grid gap-8 md:grid-cols-2">
				<JobDetails job={jobData} />
				<EmployerInfo company={jobData.company} />
			</div>

			<ActionButtons jobId={jobData.id} />
		</Container>
	);
}
