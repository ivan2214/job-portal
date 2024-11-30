import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { JobDetails } from "./components/job-details";
import { JobActions } from "./components/job-actions";
import { ApplicationsList } from "./components/applications-list";
import { Breadcrumbs } from "./components/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/db";
import { Container } from "@/components/container";

type Params = Promise<{ id: string }>;

export default async function JobPostingPage({ params }: { params: Params }) {
	const { id } = await params;

	const job = await prisma.job.findUnique({
		where: {
			id: id,
		},
		include: {
			company: true,
			applications: {
				include: {
					user: true,
				},
			},
		},
	});

	if (!job) {
		notFound();
	}

	return (
		<Container>
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<Breadcrumbs
						items={[
							{ label: "Admin", href: "/admin" },
							{ label: "Jobs", href: "/admin/jobs" },
							{ label: job.title, href: `/admin/jobs/${job.id}` },
						]}
					/>
					<Button variant="ghost" size="sm" asChild>
						<Link href="/admin/jobs">
							<ChevronLeft className="mr-2 h-4 w-4" />
							Back to Jobs
						</Link>
					</Button>
				</div>
				<div className="flex items-start justify-between">
					<div className="space-y-1">
						<h1 className="font-bold text-2xl tracking-tight">
							Job Details: {job.title}
						</h1>
						<p className="tfont-bold ext-mutend">
							Manage job posting and view applications
						</p>
					</div>
					<Badge
						variant={
							job.applicationStatus === "PENDING"
								? "pending"
								: job.applicationStatus === "ACCEPTED"
									? "success"
									: job.applicationStatus === "REJECTED"
										? "destructive"
										: "default"
						}
						className="capitalize"
					>
						{job.applicationStatus}
					</Badge>
				</div>
				<div className="grid gap-6 md:grid-cols-2">
					<Card>
						<CardContent className="pt-6">
							<JobDetails job={job} />
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<JobActions job={job} />
						</CardContent>
					</Card>
				</div>
				<Card>
					<CardContent className="pt-6">
						<ApplicationsList applications={job.applications} />
					</CardContent>
				</Card>
			</div>
		</Container>
	);
}
