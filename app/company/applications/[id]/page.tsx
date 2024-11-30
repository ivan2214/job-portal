import { Container } from "@/components/container";
import { prisma } from "@/db";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActionsCard } from "./components/actions-card";
import { ApplicantCard } from "./components/applicant-card";
import { JobCard } from "./components/job-card";
import { auth } from "@/auth";

export const metadata: Metadata = {
	title: "Job Application Details",
	description: "Manage and review job applications",
};

type Params = Promise<{ id: string }>;

export default async function ApplicationPage({ params }: { params: Params }) {
	const { id } = await params;
	const session = await auth();
	const companyId = session?.user?.id;
	const application = await prisma.application.findUnique({
		where: {
			id,
			AND: {
				job: {
					companyUserId: companyId,
				},
			},
		},
		include: {
			user: true,
			job: true,
		},
	});

	if (!application) {
		notFound();
	}

	return (
		<Container>
			<h1 className="mb-6 font-bold text-3xl">Job Application Details</h1>
			<div className="grid gap-6 md:grid-cols-2">
				<ApplicantCard applicant={application.user} />
				<JobCard job={application.job} />
				<ActionsCard
					applicationId={application.id}
					status={application.status}
					/* comments={application.comments} */
				/>
			</div>
		</Container>
	);
}
