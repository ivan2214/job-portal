import { Container } from "@/components/container";
import { prisma } from "@/db";
import JobManagement from "./components/job-management";

export default async function EmployerJobsPage() {
	const employerId = "cm41iz9ba000afo2e29s3eg6v";
	const jobs = await prisma.job.findMany({
		where: {
			userId: employerId,
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
