import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/utils/helpers";
import type { Job } from "@prisma/client";
import Link from "next/link";

interface JobListProps {
	jobs: Job[];
}

export function JobList({ jobs }: JobListProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Job Title</TableHead>
					<TableHead>Date Posted</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{jobs.map((job) => (
					<TableRow key={job.id}>
						<TableCell>{job.title}</TableCell>
						<TableCell>{formatDate(job.createdAt)}</TableCell>
						<TableCell>
							<Badge
								variant={
									job.applicationStatus === "ACCEPTED"
										? "success"
										: job.applicationStatus === "PENDING"
											? "pending"
											: "destructive"
								}
							>
								{job.applicationStatus}
							</Badge>
						</TableCell>
						<TableCell>
							<Link
								href={`/admin/jobs/${job.id}`}
								className="text-blue-600 hover:underline"
							>
								View Details
							</Link>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
