import { Container } from "@/components/container";
import { prisma } from "@/db";
import JobManagement from "./components/job-management";

export default async function CompanyJobsPage() {
	const companyId = "cm43ejos60009uct4ed84fa79";
	const jobs = await prisma.job.findMany({
		where: {
			userId: companyId,
		},
		include: {
			applications: true,
		},
	});

	return (
		<Container>
			<h1 className="mb-6 font-bold text-3xl">Job Management</h1>
			<JobManagement jobs={jobs} />
		</Container>
	);
}
