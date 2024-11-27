import { JobApplicationsDashboard } from "./components/job-applications-dashboard";

export default function DashboardPage() {
	return (
		<div className="container mx-auto py-10">
			<h1 className="mb-10 font-bold text-4xl">Job Applications Dashboard</h1>
			<JobApplicationsDashboard />
		</div>
	);
}
