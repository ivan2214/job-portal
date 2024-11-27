import type { Metadata } from "next";
import JobApplicationDetails from "./components/job-application-details";

export const metadata: Metadata = {
	title: "Job Application Details",
	description: "View details of your job application",
};

export default function JobApplicationPage({
	params,
}: { params: { id: string } }) {
	return (
		<div className="container mx-auto px-4 py-8">
			<JobApplicationDetails id={params.id} />
		</div>
	);
}
