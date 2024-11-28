import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Application, User } from "@prisma/client";
import Link from "next/link";

export default function ApplicationList({
	applications,
}: {
	applications: (Application & {
		user: User | null;
	})[];
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Applications</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Date Applied</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{applications.map((application) => (
							<TableRow key={application.id}>
								<TableCell>{application.user?.name}</TableCell>
								<TableCell>{application.user?.email}</TableCell>
								<TableCell>
									{application.dateApplied.toLocaleDateString()}
								</TableCell>
								<TableCell>
									<Link
										href={`/employer/applications/${application.id}`}
										className="text-blue-600 hover:underline"
									>
										View Details
									</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
