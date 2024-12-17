import { BreadcrumbDynamic } from "@/components/breadcrumbs-dynamic";
import { Container } from "@/components/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {} from "@/components/ui/breadcrumb";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/db";
import { formatDate } from "@/utils/helpers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CompanyAdminButtonDelete } from "../components/company-admin-button-delete";
import { CompanyAdminButtonEdit } from "../components/company-admin-button-edit";
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
			<BreadcrumbDynamic
				items={[
					{ label: "Admin", href: "/admin" },
					{ label: "Companies", href: "/admin/companies" },
					{
						label: company.name || "",
						href: `/admin/companies/${company.userId}`,
					},
				]}
			/>

			<div className="mt-6 grid gap-6 md:grid-cols-2">
				{/* <Card>
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
				</Card> */}

				<Card>
					<CardHeader>
						<div className="flex items-center space-x-4">
							<Avatar className="h-20 w-20">
								<AvatarImage
									src={company.logo || ""}
									alt={company.name || ""}
								/>
								<AvatarFallback>{company?.name?.charAt(0)}</AvatarFallback>
							</Avatar>
							<div>
								<h2 className="font-bold text-2xl">{company.name}</h2>
								<p className="text-muted-foreground">{company.email}</p>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="grid gap-2">
							{/* <div className="flex justify-between">
								<span className="font-medium">Role:</span>
								<Badge>{company.role}</Badge>
							</div> */}
							<div className="flex justify-between">
								<span className="font-medium">Date Registered:</span>
								<span>{formatDate(company.createdAt)}</span>
							</div>
							<div className="flex justify-between">
								<span className="font-medium">Total Jobs:</span>
								<Badge>{company.jobPostings.length}</Badge>
							</div>
						</div>
						<Separator className="my-4" />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Actions</CardTitle>
						<CardDescription>Manage this company's account</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						<CompanyAdminButtonEdit
							redirectUrl={`/admin/companies/${company.userId}`}
							company={company}
						/>

						<CompanyAdminButtonDelete
							redirectUrl="/admin/companies"
							id={company.userId}
						/>
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
