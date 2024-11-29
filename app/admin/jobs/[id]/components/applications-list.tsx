"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { ApplicationWithRelations } from "@/types";

interface ApplicationsListProps {
	applications: ApplicationWithRelations[];
}

export function ApplicationsList({ applications }: ApplicationsListProps) {
	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h3 className="font-medium">Applications</h3>
				<Select>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Filter by status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Applications</SelectItem>
						<SelectItem value="pending">Pending Review</SelectItem>
						<SelectItem value="reviewed">Reviewed</SelectItem>
						<SelectItem value="interviewed">Interviewed</SelectItem>
						<SelectItem value="rejected">Rejected</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Candidate</TableHead>
						<TableHead>Applied Date</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{applications.map((application) => (
						<TableRow key={application.id}>
							<TableCell>
								<div className="flex items-center space-x-4">
									{/* <Image
										src={application.user.avatar}
										alt={application.user.name}
										width={40}
										height={40}
										className="rounded-full"
									/> */}
									<div>
										<div className="font-medium">{application.user?.name}</div>
										<div className="text-muted-foreground text-sm">
											{application.user?.email}
										</div>
									</div>
								</div>
							</TableCell>
							<TableCell>
								{new Date(application.dateApplied).toLocaleDateString()}
							</TableCell>
							<TableCell>
								<Badge variant="outline" className="capitalize">
									{application.status}
								</Badge>
							</TableCell>
							<TableCell>
								<Link
									href={`/admin/applications/${application.id}`}
									className="text-primary text-sm hover:underline"
								>
									View Details
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
