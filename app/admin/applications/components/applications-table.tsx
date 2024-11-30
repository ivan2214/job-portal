import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Application, Job, User } from "@prisma/client";
import { Eye } from "lucide-react";

type ApplicationWithRelations = Application & {
	job?: Job | null;
	user: User | null;
};

export default function ApplicationsTable({
	applications,
}: {
	applications: ApplicationWithRelations[];
}) {
	// In a real application, you would fetch data based on search, sort, and page

	if (applications.length === 0) {
		return (
			<div className="py-10 text-center">
				<p className="text-gray-600 text-xl">
					No applications found. Adjust your search filters.
				</p>
			</div>
		);
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Applicant Name</TableHead>
					<TableHead>Job Title</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Created At</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{applications.map((application) => (
					<TableRow key={application.id}>
						<TableCell>
							<Link
								href={`/admin/users/${application.user?.id}`}
								className="text-blue-600 hover:underline"
							>
								{application.user?.name}
							</Link>
						</TableCell>
						<TableCell>
							<Link
								href={`/admin/jobs/${application.job?.id}`}
								className="text-blue-600 hover:underline"
							>
								{application.job?.title}
							</Link>
						</TableCell>
						<TableCell>{application.status}</TableCell>
						<TableCell>{application.createdAt.toLocaleDateString()}</TableCell>
						<TableCell>
							<div className="flex space-x-2">
								<Button asChild variant="outline" size="sm">
									<Link href={`/admin/applications/${application.id}`}>
										<Eye className="mr-2 h-4 w-4" /> View
									</Link>
								</Button>
								<Button
									variant="outline"
									size="sm"
									className="bg-green-100 hover:bg-green-200"
								>
									Accept
								</Button>
								<Button
									variant="outline"
									size="sm"
									className="bg-red-100 hover:bg-red-200"
								>
									Reject
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
