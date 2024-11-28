"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface Application {
	id: number;
	applicantName: string;
	jobTitle: string;
	status: string;
}

interface JobApplicationsTableProps {
	applications: Application[];
}

export function JobApplicationsTable({
	applications,
}: JobApplicationsTableProps) {
	const getStatusColor = (status: string) => {
		switch (status) {
			case "Pending":
				return "bg-yellow-500";
			case "Accepted":
				return "bg-green-500";
			case "Rejected":
				return "bg-red-500";
			default:
				return "bg-gray-500";
		}
	};

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Applicant Name</TableHead>
					<TableHead>Job Title</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{applications.map((application) => (
					<TableRow key={application.id}>
						<TableCell className="font-medium">
							{application.applicantName}
						</TableCell>
						<TableCell>{application.jobTitle}</TableCell>
						<TableCell>
							<Badge className={getStatusColor(application.status)}>
								{application.status}
							</Badge>
						</TableCell>
						<TableCell>
							<Button variant="outline" size="sm">
								View Details
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
