import { Container } from "@/components/container";
import { prisma } from "@/db";
import { JobApplicationsDashboard } from "./components/job-applications-dashboard";

export default async function DashboardPage() {
	const companyId = "cm43ejos60009uct4ed84fa79";
	const applications = await prisma.application.findMany({
		where: {
			job: {
				companyUserId: companyId,
			},
		},
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
