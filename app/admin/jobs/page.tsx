import { Container } from "@/components/container";
import { prisma } from "@/db";
import { JobsDataTable } from "./components/jobs-data-table";
import { JobsHeader } from "./components/jobs-header";

export default async function JobsPage() {
	const jobs = await prisma.job.findMany({
		include: {
			company: true,
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
