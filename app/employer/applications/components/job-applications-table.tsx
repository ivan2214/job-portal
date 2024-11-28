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
import type { Application, ApplicationStatus, Job, User } from "@prisma/client";
import { Eye } from "lucide-react";
import Link from "next/link";

interface JobApplicationsTableProps {
	applications: (Application & {
		user: User | null;
		job: Job | null;
	})[];
}

export const getStatusColor = (status: ApplicationStatus) => {
	switch (status) {
		case "PENDING":
			return "bg-yellow-500";
		case "ACCEPTED":
			return "bg-green-500";
		case "REJECTED":
			return "bg-red-500";
		default:
			return "bg-gray-500";
	}
};

export function JobApplicationsTable({
	applications,
}: JobApplicationsTableProps) {
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
							{application.user?.name}
						</TableCell>
						<TableCell>{application.job?.title}</TableCell>
						<TableCell>
							<Badge className={getStatusColor(application.status)}>
								{application.status}
							</Badge>
						</TableCell>
						<TableCell>
							<Button asChild variant="outline" size="sm">
								<Link href={`/employer/applications/${application.id}`}>
									<Eye className="mr-2 h-4 w-4" /> View Details
								</Link>
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
