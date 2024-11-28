import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { ChevronRight } from "lucide-react";

import { Container } from "@/components/container";
import { BriefcaseIcon, FileTextIcon } from "lucide-react";
import { ActivitySummary } from "./components/activity-summary";

export default function UserProfile() {
	// This would typically come from your data fetching logic
	const user = {
		id: "1",
		name: "Alice Johnson",
		email: "alice@example.com",
		role: "Employer",
		dateRegistered: "2023-01-15",
		avatar: "/placeholder.svg?height=100&width=100",
		jobsPosted: 12,
		applicationsSubmitted: 0,
	};

	const recentLogs = [
		{ id: 1, action: "Posted a new job", date: "2023-05-01" },
		{ id: 2, action: "Updated company profile", date: "2023-04-28" },
		{ id: 3, action: "Viewed applicant resume", date: "2023-04-25" },
	];

	return (
		<Container>
			<h1 className="mb-6 font-bold text-3xl">User Profile</h1>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<ChevronRight className="h-4 w-4" />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbLink href="/admin/users">Users</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<ChevronRight className="h-4 w-4" />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbPage>{user.name}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<div className="flex items-center space-x-4">
							<Avatar className="h-20 w-20">
								<AvatarImage src={user.avatar} alt={user.name} />
								<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
							</Avatar>
							<div>
								<h2 className="font-bold text-2xl">{user.name}</h2>
								<p className="text-muted-foreground">{user.email}</p>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="grid gap-2">
							<div className="flex justify-between">
								<span className="font-medium">Role:</span>
								<Badge>{user.role}</Badge>
							</div>
							<div className="flex justify-between">
								<span className="font-medium">Date Registered:</span>
								<span>{user.dateRegistered}</span>
							</div>
						</div>
						<Separator className="my-4" />
						<div className="flex space-x-2">
							<Button variant="destructive">Suspend User</Button>
							<Button variant="outline">Manage Permissions</Button>
						</div>
					</CardContent>
				</Card>

				<div className="grid gap-6">
					<h3 className="font-semibold text-xl">Activity Summary</h3>
					<div className="grid gap-4 md:grid-cols-2">
						<ActivitySummary
							title="Jobs Posted"
							count={user.jobsPosted}
							icon={<BriefcaseIcon className="h-4 w-4 text-muted-foreground" />}
						/>
						<ActivitySummary
							title="Applications Submitted"
							count={user.applicationsSubmitted}
							icon={<FileTextIcon className="h-4 w-4 text-muted-foreground" />}
						/>
					</div>
				</div>

				<Card className="md:col-span-2">
					<CardHeader>
						<CardTitle>Recent Logs</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Action</TableHead>
									<TableHead>Date</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{recentLogs.map((log) => (
									<TableRow key={log.id}>
										<TableCell>{log.action}</TableCell>
										<TableCell>{log.date}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</Container>
	);
}
