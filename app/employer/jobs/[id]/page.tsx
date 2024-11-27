import { notFound } from "next/navigation";
import JobDetails from "./components/job-details";
import JobStatistics from "./components/job-statistics";
import ApplicationList from "./components/application-list";
import ActionButtons from "./components/action-buttons";

async function getJobData(id: string) {
	// This is a placeholder function. In a real application, you would fetch the job data from your database or API.
	const job = {
		id,
		title: "Senior React Developer",
		description:
			"We are looking for an experienced React developer to join our team...",
		location: "Remote",
		salary: "$120,000 - $150,000",
		datePosted: "2023-05-15",
		views: 1250,
		applications: 45,
	};
	return job;
}

async function getApplications(jobId: string) {
	// This is a placeholder function. In a real application, you would fetch the applications from your database or API.
	return [
		{
			id: "1",
			name: "John Doe",
			email: "john@example.com",
			dateApplied: "2023-05-20",
		},
		{
			id: "2",
			name: "Jane Smith",
			email: "jane@example.com",
			dateApplied: "2023-05-21",
		},
		// ... more applications
	];
}

export default async function JobManagementPage({
	params,
}: { params: { id: string } }) {
	const job = await getJobData(params.id);
	const applications = await getApplications(params.id);

	if (!job) {
		notFound();
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="mb-8 font-bold text-3xl">{job.title}</h1>
			<div className="grid gap-8 md:grid-cols-2">
				<div>
					<JobDetails job={job} />
					<JobStatistics job={job} />
					<ActionButtons jobId={job.id} />
				</div>
				<div>
					<ApplicationList applications={applications} />
				</div>
			</div>
		</div>
	);
}
