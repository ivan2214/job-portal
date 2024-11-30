import { Container } from "@/components/container";
import EditCompanyButton from "@/components/edit-company-button";
import SuspendCompanyButton from "@/components/suspend-company-button";
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
import { prisma } from "@/db";
import { formatDate } from "@/utils/helpers";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { JobList } from "./components/job-list";

type Params = Promise<{ id: string }>;

export default async function CompanyDetailsPage({
	params,
}: { params: Params }) {
	const { id } = await params;

	const company = await prisma.company.findUnique({
		where: {
			userId: id,
		},
		include: {
			jobPostings: true,
			user: true,
		},
	});

	if (!company) {
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
						<BreadcrumbLink href="/admin/companies">Companys</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<ChevronRight className="h-4 w-4" />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbPage>{company.name}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="mt-6 grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Company Details</CardTitle>
					</CardHeader>
					<CardContent>
						<dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div>
								<dt className="font-medium text-gray-500">Company Name</dt>
								<dd className="mt-1">{company.name}</dd>
							</div>
							<div>
								<dt className="font-medium text-gray-500">Email</dt>
								<dd className="mt-1">{company.email}</dd>
							</div>
							<div>
								<dt className="font-medium text-gray-500">Date Joined</dt>
								<dd className="mt-1">{formatDate(company.createdAt)}</dd>
							</div>
							<div>
								<dt className="font-medium text-gray-500">Total Jobs Posted</dt>
								<dd className="mt-1">{company.jobPostings.length}</dd>
							</div>
						</dl>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Actions</CardTitle>
						<CardDescription>Manage this company's account</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						<SuspendCompanyButton companyId={company.userId} />
						<EditCompanyButton company={company} />
					</CardContent>
				</Card>
			</div>

			<Card className="mt-6">
				<CardHeader>
					<CardTitle>Jobs Posted</CardTitle>
					<CardDescription>
						List of all jobs created by this company
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Suspense fallback={<div>Loading jobs...</div>}>
						<JobList jobs={company.jobPostings} />
					</Suspense>
				</CardContent>
			</Card>
		</Container>
	);
}
