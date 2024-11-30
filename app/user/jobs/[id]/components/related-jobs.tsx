import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { JobWithRelations } from "@/types";

interface RelatedJobsProps {
	jobs: JobWithRelations[];
}

export function RelatedJobs({ jobs }: RelatedJobsProps) {
	return (
		<div className="mt-8 grid gap-4">
			<h2 className="font-bold text-2xl">Related Jobs</h2>
			{jobs.map((job) => (
				<Card key={job.id}>
					<CardHeader>
						<CardTitle>{job.title}</CardTitle>
						<CardDescription>
							{job.company?.name} - {job.location}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="mb-2 text-gray-500 text-sm">
							{job.description.slice(0, 100)}...
						</p>
						{job.salary && (
							<p className="mb-2 font-semibold text-sm">{job.salary}</p>
						)}
						<Badge variant="secondary">{job.applicationStatus}</Badge>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
