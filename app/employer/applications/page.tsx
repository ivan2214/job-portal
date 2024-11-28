import { Container } from "@/components/container";
import { JobApplicationsDashboard } from "./components/job-applications-dashboard";
import { prisma } from "@/db";

export default async function DashboardPage() {
	const applications = await prisma.application.findMany({
		include: {
			user: true,
			job: true,
		},
	});

	return (
		<Container>
			<h1 className="mb-10 font-bold text-4xl">Job Applications Dashboard</h1>
			<JobApplicationsDashboard applications={applications} />
		</Container>
	);
}
