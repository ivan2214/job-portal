import Link from "next/link";
import { Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Job {
	id: number;
	title: string;
	status: "open" | "closed";
	applications: number;
}

interface RecentActivityProps {
	jobs: Job[];
}

export function RecentActivity({ jobs }: RecentActivityProps) {
	return (
		<div>
			<h2 className="mb-4 font-bold text-2xl">Recent Activity</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Job Title</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Applications</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{jobs.map((job) => (
						<TableRow key={job.id}>
							<TableCell className="font-medium">{job.title}</TableCell>
							<TableCell>
								<Badge
									variant={job.status === "open" ? "default" : "secondary"}
								>
									{job.status}
								</Badge>
							</TableCell>
							<TableCell>{job.applications}</TableCell>
							<TableCell>
								<Button variant="ghost" size="sm" asChild>
									<Link href={`/employer/jobs/${job.id}`}>
										<Edit className="mr-2 h-4 w-4" />
										Edit
									</Link>
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
