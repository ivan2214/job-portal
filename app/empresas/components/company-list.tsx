import CompanyCard from "./company-card";
import Pagination from "./pagination";
import { fetchCompanies } from "@/lib/fakeApi";

export default async function CompanyList({
	query,
	page,
}: { query: string; page: number }) {
	const { companies, totalPages } = await fetchCompanies(query, page);

	if (companies.length === 0) {
		return (
			<div className="mt-12 text-center">
				<h2 className="mb-4 font-semibold text-2xl">No companies found</h2>
				<p className="text-gray-600">
					Try adjusting your search criteria or browse all companies.
				</p>
			</div>
		);
	}

	return (
		<>
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{companies.map((company) => (
					<CompanyCard key={company.id} company={company} />
				))}
			</div>
			<Pagination currentPage={page} totalPages={totalPages} />
		</>
	);
}
