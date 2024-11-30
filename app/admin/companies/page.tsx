import { Container } from "@/components/container";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { prisma } from "@/db";
import { ChevronRight } from "lucide-react";
import { Companies } from "./components/companies";

export default async function CompaniesPage() {
	const companies = await prisma.company.findMany({
		include: {
			jobPostings: true,
			user: true,
		},
	});
	return (
		<Container>
			<h1 className="mb-6 font-bold text-3xl text-gray-800">Companies</h1>
			<Breadcrumb className="mb-6">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<ChevronRight className="h-4 w-4" />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbLink href="/admin/companies">Companies</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<Companies companies={companies} />
		</Container>
	);
}
