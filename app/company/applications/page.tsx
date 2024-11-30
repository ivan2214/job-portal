import { Container } from "@/components/container";
import { prisma } from "@/db";
import { JobApplicationsDashboard } from "./components/job-applications-dashboard";
import { auth } from "@/auth";

export default async function DashboardPage() {
	const session = await auth();
	const companyId = session?.user?.id;
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
