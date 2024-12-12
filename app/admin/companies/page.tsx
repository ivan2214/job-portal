import { Container } from "@/components/container";
import {} from "@/components/ui/breadcrumb";
import { prisma } from "@/db";

import { BreadcrumbDynamic } from "@/components/breadcrumbs-dynamic";
import { CompanyAdminTable } from "../components/company-admin-table";

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
			<BreadcrumbDynamic
				items={[
					{ label: "Admin", href: "/admin" },
					{ label: "Companies", href: "/admin/companies" },
				]}
			/>
			<CompanyAdminTable companies={companies} />
		</Container>
	);
}
