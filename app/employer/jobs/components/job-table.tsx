import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";

interface Job {
	id: number;
	title: string;
	location: string;
	applications: number;
}

interface JobTableProps {
	jobs: Job[];
	onDelete: (id: number) => void;
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
						<TableCell>{job.applications}</TableCell>
						<TableCell>
							<div className="flex space-x-2">
								<Button variant="outline" size="sm">
									<Eye className="mr-2 h-4 w-4" /> View
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
