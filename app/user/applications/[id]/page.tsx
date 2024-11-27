import type { Metadata } from "next";
import JobApplicationDetails from "./components/job-application-details";
import { Container } from "@/components/container";

export const metadata: Metadata = {
	title: "Job Application Details",
	description: "View details of your job application",
};

export default function JobApplicationPage({
	params,
}: { params: { id: string } }) {
	return (
		<Container>
			<JobApplicationDetails id={params.id} />
		</Container>
	);
}
