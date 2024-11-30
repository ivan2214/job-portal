import { Container } from "@/components/container";
import { prisma } from "@/db";
import type { Metadata } from "next";
import JobApplicationDetails from "./components/job-application-details";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

export const metadata: Metadata = {
	title: "Job Application Details",
	description: "View details of your job application",
};

export default async function JobApplicationPage({
	params,
}: { params: Params }) {
	const { id } = await params;

	const application = await prisma.application.findUnique({
		where: {
			id: id,
		},
		include: {
			job: {
				include: {
					company: true,
				},
			},
		},
	});

	if (!application) {
		return notFound();
	}

	return (
		<Container>
			<JobApplicationDetails application={application} />
		</Container>
	);
}
