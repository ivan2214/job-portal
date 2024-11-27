import { Container } from "@/components/container";
import { JobApplicationsDashboard } from "./components/job-applications-dashboard";

export default function DashboardPage() {
	return (
		<Container>
			<h1 className="mb-10 font-bold text-4xl">Job Applications Dashboard</h1>
			<JobApplicationsDashboard />
		</Container>
	);
}
