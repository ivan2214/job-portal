import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

import {} from "@/components/ui/breadcrumb";

import { BreadcrumbDynamic } from "@/components/breadcrumbs-dynamic";
import { Container } from "@/components/container";
import { prisma } from "@/db";
import { BriefcaseIcon, FileTextIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { UserAdminButtonChangeStatus } from "../components/user-admin-button-change-status";
import { UserAdminButtonDelete } from "../components/user-admin-button-delete";
import { UserAdminButtonEdit } from "../components/user-admin-button-edit";
import { ActivitySummary } from "./components/activity-summary";

type Params = Promise<{ id: string }>;

export default async function UserProfile({ params }: { params: Params }) {
	const { id } = await params;
	const user = await prisma.user.findUnique({
		where: {
			id: id,
		},
		include: {
			applications: {
				include: {
					job: true,
				},
			},
			company: {
				include: {
					jobPostings: true,
				},
			},
		},
	});

	if (!user) {
		return notFound();
	}

	const recentLogs = [
		{ id: 1, action: "Posted a new job", date: "2023-05-01" },
		{ id: 2, action: "Updated company profile", date: "2023-04-28" },
		{ id: 3, action: "Viewed applicant resume", date: "2023-04-25" },
	];

	return (
		<Container>
			<h1 className="mb-6 font-bold text-3xl">User Profile</h1>
			<BreadcrumbDynamic
				items={[
					{ label: "Admin", href: "/admin" },
					{ label: "Users", href: "/admin/users" },
					{ label: user.name || "", href: `/admin/users/${user.id}` },
				]}
			/>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<div className="flex items-center space-x-4">
							<Avatar className="h-20 w-20">
								<AvatarImage src={user.image || ""} alt={user.name || ""} />
								<AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
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
								<span>{user.createdAt.toLocaleDateString()}</span>
							</div>
							<div className="flex justify-between">
								<span className="font-medium">Status:</span>
								<Badge>{user.status}</Badge>
							</div>
						</div>
						<Separator className="my-4" />
						<div className="flex space-x-2">
							<UserAdminButtonEdit
								redirectUrl={`/admin/users/${user.id}`}
								user={user}
							/>

							<UserAdminButtonChangeStatus
								redirectUrl={`/admin/users/${user.id}`}
								id={user.id}
								user={user}
							/>

							<UserAdminButtonDelete redirectUrl="/admin/users" id={user.id} />
						</div>
					</CardContent>
				</Card>

				<div className="grid gap-6">
					<h3 className="font-semibold text-xl">Activity Summary</h3>
					<div className="grid gap-4 md:grid-cols-2">
						<ActivitySummary
							title="Jobs Posted"
							count={user.company?.jobPostings.length || 0}
							icon={<BriefcaseIcon className="h-4 w-4 text-muted-foreground" />}
						/>
						<ActivitySummary
							title="Applications Submitted"
							count={user.applications.length}
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
