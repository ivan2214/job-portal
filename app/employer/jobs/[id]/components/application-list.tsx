import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface Application {
	id: string;
	name: string;
	email: string;
	dateApplied: string;
}

export default function ApplicationList({
	applications,
}: { applications: Application[] }) {
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
								<TableCell>{application.name}</TableCell>
								<TableCell>{application.email}</TableCell>
								<TableCell>{application.dateApplied}</TableCell>
								<TableCell>
									<Link
										href={`/applications/${application.id}`}
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
