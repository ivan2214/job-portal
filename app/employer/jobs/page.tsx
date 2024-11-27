import JobManagement from "./components/job-management";

export default function EmployerJobsPage() {
	return (
		<div className="container mx-auto py-10">
			<h1 className="mb-6 font-bold text-3xl">Job Management</h1>
			<JobManagement />
		</div>
	);
}
