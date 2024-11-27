import { Container } from "@/components/container";
import JobManagement from "./components/job-management";

export default function EmployerJobsPage() {
	return (
		<Container>
			<h1 className="mb-6 font-bold text-3xl">Job Management</h1>
			<JobManagement />
		</Container>
	);
}
