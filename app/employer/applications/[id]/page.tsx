import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApplicantCard } from "./components/applicant-card";
import { JobCard } from "./components/job-card";
import { ActionsCard } from "./components/actions-card";
import { Container } from "@/components/container";

export const metadata: Metadata = {
	title: "Job Application Details",
	description: "Manage and review job applications",
};

async function getApplication(id: string) {
	// In a real application, you would fetch this data from your API or database
	const application = {
		id,
		applicant: {
			name: "John Doe",
			email: "john.doe@example.com",
			resumeLink: "https://example.com/resume.pdf",
		},
		job: {
			title: "Senior React Developer",
			department: "Engineering",
			location: "Remote",
		},
		status: "Pending",
		comments: [],
	};

	return application;
}

export default async function ApplicationPage({
	params,
}: { params: { id: string } }) {
	const application = await getApplication(params.id);

	if (!application) {
		notFound();
	}

	return (
		<Container>
			<h1 className="mb-6 font-bold text-3xl">Job Application Details</h1>
			<div className="grid gap-6 md:grid-cols-2">
				<ApplicantCard applicant={application.applicant} />
				<JobCard job={application.job} />
				<ActionsCard
					applicationId={application.id}
					status={application.status}
					comments={application.comments}
				/>
			</div>
		</Container>
	);
}
