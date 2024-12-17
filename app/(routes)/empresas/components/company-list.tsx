import CompanyCard from "./company-card";
import Pagination from "./pagination";
import type { Company } from "@prisma/client";

export default function CompanyList({
	companies,
	totalPages,
	page,
}: {
	companies: (Company & { _count: { jobPostings: number } })[];
	totalPages: number;
	page: number;
}) {
	return (
		<>
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{companies.map((company) => (
					<CompanyCard key={company.userId} company={company} />
				))}
			</div>
			<Pagination currentPage={page} totalPages={totalPages} />
		</>
	);
}
