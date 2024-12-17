import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Job } from "@prisma/client";

export default function JobDetails({ job }: { job: Job }) {
	return (
		<Card className="mb-8">
			<CardHeader>
				<CardTitle>Job Details</CardTitle>
			</CardHeader>
			<CardContent>
				<dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<dt className="font-medium text-gray-500">Location</dt>
						<dd>{job.location}</dd>
					</div>
					<div>
						<dt className="font-medium text-gray-500">Salary</dt>
						<dd>{job.salaryText}</dd>
					</div>
					<div>
						<dt className="font-medium text-gray-500">Date Posted</dt>
						<dd>{job.createdAt.toLocaleDateString()}</dd>
					</div>
				</dl>
				<div className="mt-4">
					<h3 className="font-medium text-gray-500">Description</h3>
					<p className="mt-2">{job.description}</p>
				</div>
			</CardContent>
		</Card>
	);
}
