import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Application, Job } from "@prisma/client";
import { Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";

interface JobTableProps {
	jobs: (Job & {
		applications: Application[] | null;
	})[];
	onDelete: (id: string) => void;
}

export default function JobTable({ jobs, onDelete }: JobTableProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Job Title</TableHead>
					<TableHead>Location</TableHead>
					<TableHead>Applications</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{jobs.map((job) => (
					<TableRow key={job.id}>
						<TableCell className="font-medium">{job.title}</TableCell>
						<TableCell>{job.location}</TableCell>
						<TableCell>{job?.applications?.length}</TableCell>
						<TableCell>
							<div className="flex space-x-2">
								<Button asChild variant="outline" size="sm">
									<Link href={`/employer/jobs/${job.id}`}>
										<Eye className="mr-2 h-4 w-4" /> View
									</Link>
								</Button>
								<Button variant="outline" size="sm">
									<Edit className="mr-2 h-4 w-4" /> Edit
								</Button>
								<Button
									variant="outline"
									size="sm"
									onClick={() => onDelete(job.id)}
								>
									<Trash2 className="mr-2 h-4 w-4" /> Delete
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
