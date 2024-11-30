import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import {} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

import { prisma } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JobApplicationDetails } from "./components/job-application-details";
import { WithdrawConfirmationModal } from "./components/withdraw-confirmation-modal";
type Params = Promise<{ id: string }>;

export default async function JobApplicationDetailsPage({
	params,
}: { params: Params }) {
	const { id } = await params;

	const job = await prisma.job.findUnique({
		where: {
			id,
		},
		include: {
			company: true,
		},
	});

	if (!job) {
		return notFound();
	}

	return (
		<Container>
			<Button variant="ghost" asChild className="mb-4">
				<Link href="/user/jobs">
					<ArrowLeft className="mr-2 h-4 w-4" /> Back to Applied Jobs
				</Link>
			</Button>

			<JobApplicationDetails job={job} />

			{/* <RelatedJobs jobs={relatedJobs} /> */}

			<WithdrawConfirmationModal />
		</Container>
	);
}
