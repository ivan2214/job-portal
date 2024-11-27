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
import Link from "next/link";

interface Job {
	id: string;
	title: string;
	datePosted: Date;
	status: "Active" | "Closed";
}

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
						<TableCell>{formatDate(job.datePosted)}</TableCell>
						<TableCell>
							<Badge
								variant={job.status === "Active" ? "default" : "secondary"}
							>
								{job.status}
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
