import { Container } from "@/components/container";
import { JobsDataTable } from "./components/jobs-data-table";
import { JobsHeader } from "./components/jobs-header";
import { prisma } from "@/db";

export default async function JobsPage() {
	const jobs = await prisma.job.findMany({
		include: {
			Company: true,
			applications: true,
		},
	});
	return (
		<Container className="space-y-8">
			<JobsHeader />
			<JobsDataTable jobs={jobs} />
		</Container>
	);
}
