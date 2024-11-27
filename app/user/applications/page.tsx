"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	mockApplications,
	type JobApplication,
	type ApplicationStatus,
} from "./data/mockApplications";
import Link from "next/link";
import { Container } from "@/components/container";

export default function Dashboard() {
	const [applications, setApplications] =
		useState<JobApplication[]>(mockApplications);
	const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "All">(
		"All",
	);
	const [titleFilter, setTitleFilter] = useState("");

	const filteredApplications = applications.filter(
		(app) =>
			(statusFilter === "All" || app.status === statusFilter) &&
			app.jobTitle.toLowerCase().includes(titleFilter.toLowerCase()),
	);

	const handleViewDetails = (id: string) => {
		// Implement view details functionality
		console.log(`View details for application ${id}`);
	};

	return (
		<Container>
			<h1 className="mb-6 font-bold text-2xl">Job Application Dashboard</h1>

			<div className="mb-6 grid gap-4 md:grid-cols-2">
				<div>
					<Label htmlFor="status-filter">Filter by Status</Label>
					<Select
						onValueChange={(value) =>
							setStatusFilter(value as ApplicationStatus | "All")
						}
					>
						<SelectTrigger id="status-filter">
							<SelectValue placeholder="Select status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="All">All</SelectItem>
							<SelectItem value="Pending">Pending</SelectItem>
							<SelectItem value="Accepted">Accepted</SelectItem>
							<SelectItem value="Rejected">Rejected</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<Label htmlFor="title-filter">Filter by Job Title</Label>
					<Input
						id="title-filter"
						placeholder="Enter job title"
						onChange={(e) => setTitleFilter(e.target.value)}
					/>
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{filteredApplications.map((application) => (
					<Card key={application.id}>
						<CardHeader>
							<CardTitle>{application.jobTitle}</CardTitle>
							<Badge
								variant={
									application.status === "Accepted"
										? "success"
										: application.status === "Rejected"
											? "destructive"
											: "default"
								}
							>
								{application.status}
							</Badge>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground text-sm">
								{application.company}
							</p>
							<p className="text-muted-foreground text-sm">
								Applied: {application.appliedDate}
							</p>
						</CardContent>
						<CardFooter>
							<Button asChild size="sm">
								<Link href={`/user/applications/${application.id}`}>
									View Details
								</Link>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</Container>
	);
}
