import { Container } from "@/components/container";
import EditEmployerButton from "@/components/edit-employer-button";
import SuspendEmployerButton from "@/components/suspend-employer-button";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/utils/helpers";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { JobList } from "./components/job-list";
import { prisma } from "@/db";

export default async function EmployerDetailsPage({
	params,
}: { params: { id: string } }) {
	const employer = await prisma.user.findUnique({
		where: {
			id: params.id,
		},
		include: {
			Company: true,
			postedJobs: true,
		},
	});

	console.log("Employer ID:", params.id);

	if (!employer) {
		notFound();
	}

	return (
		<Container>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<ChevronRight className="h-4 w-4" />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbLink href="/admin/employers">Employers</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<ChevronRight className="h-4 w-4" />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbPage>{employer.Company?.name}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="mt-6 grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Employer Details</CardTitle>
					</CardHeader>
					<CardContent>
						<dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div>
								<dt className="font-medium text-gray-500">Company Name</dt>
								<dd className="mt-1">{employer.Company?.name}</dd>
							</div>
							<div>
								<dt className="font-medium text-gray-500">Email</dt>
								<dd className="mt-1">{employer.email}</dd>
							</div>
							<div>
								<dt className="font-medium text-gray-500">Date Joined</dt>
								<dd className="mt-1">{formatDate(employer.createdAt)}</dd>
							</div>
							<div>
								<dt className="font-medium text-gray-500">Total Jobs Posted</dt>
								<dd className="mt-1">{employer.postedJobs.length}</dd>
							</div>
						</dl>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Actions</CardTitle>
						<CardDescription>Manage this employer's account</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						<SuspendEmployerButton employerId={employer.id} />
						<EditEmployerButton employer={employer} />
					</CardContent>
				</Card>
			</div>

			<Card className="mt-6">
				<CardHeader>
					<CardTitle>Jobs Posted</CardTitle>
					<CardDescription>
						List of all jobs created by this employer
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Suspense fallback={<div>Loading jobs...</div>}>
						<JobList jobs={employer.postedJobs} />
					</Suspense>
				</CardContent>
			</Card>
		</Container>
	);
}
