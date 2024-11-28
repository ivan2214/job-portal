"use client";

import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Calendar, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { RelatedJobs } from "./components/related-jobs";
import { WithdrawConfirmationModal } from "./components/withdraw-confirmation-modal";
import { jobData, relatedJobs } from "./data/job-data";
import type { JobApplicationProps } from "./types/job";

export default function JobApplicationDetails({
	job = jobData,
	onWithdraw,
	onBack,
}: JobApplicationProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleWithdraw = () => {
		setIsModalOpen(true);
	};

	const confirmWithdraw = () => {
		onWithdraw(job.id);
		setIsModalOpen(false);
	};

	return (
		<Container>
			<Button variant="ghost" onClick={onBack} className="mb-4">
				<ArrowLeft className="mr-2 h-4 w-4" /> Back to Applied Jobs
			</Button>

			<Card className="mb-8">
				<CardHeader>
					<div className="flex items-start justify-between">
						<div>
							<CardTitle className="mb-2 text-3xl">{job.title}</CardTitle>
							<CardDescription className="text-xl">
								<Link href={job.company.profileUrl} className="hover:underline">
									{job.company.name}
								</Link>
							</CardDescription>
						</div>
						<Badge variant="secondary" className="text-lg">
							{job.applicationStatus}
						</Badge>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="flex items-center text-gray-600">
							<MapPin className="mr-2 h-5 w-5" />
							{job.location}
						</div>
						{job.salary && (
							<div className="flex items-center text-gray-600">
								<DollarSign className="mr-2 h-5 w-5" />
								{job.salary}
							</div>
						)}
						<div className="flex items-center text-gray-600">
							<Calendar className="mr-2 h-5 w-5" />
							Applied on {job.dateApplied}
						</div>
						<div className="mt-4">
							<h3 className="mb-2 font-semibold text-xl">Job Description</h3>
							<p className="whitespace-pre-line text-gray-700">
								{job.description}
							</p>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button variant="destructive" onClick={handleWithdraw}>
						Withdraw Application
					</Button>
				</CardFooter>
			</Card>

			<RelatedJobs jobs={relatedJobs} />

			<WithdrawConfirmationModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={confirmWithdraw}
			/>
		</Container>
	);
}
