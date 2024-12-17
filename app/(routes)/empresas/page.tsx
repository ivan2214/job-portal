import { Container } from "@/components/container";
import type { Metadata } from "next";
import CompanyList from "./components/company-list";
import SearchBar from "./components/search-bar";
import { prisma } from "@/db";

type SearchParams = Promise<{
	query?: string;
	page?: string;
}>;

export const metadata: Metadata = {
	title: "Explore Companies | YourPlatform",
	description: "Browse and discover companies registered on our platform.",
};

export default async function CompaniesPage({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const params = await searchParams;

	const query = typeof params.query === "string" ? params.query : "";
	const page =
		typeof params.page === "string" ? Number.parseInt(params.page, 10) : 1;

	const companies = await prisma.company.findMany({
		where: {
			name: {
				contains: query,
				mode: "insensitive",
			},
		},
		orderBy: {
			name: "asc",
		},
		skip: (page - 1) * 3,
		include: {
			_count: {
				select: {
					jobPostings: true,
				},
			},
		},
	});

	const totalPages = Math.ceil(
		(await prisma.company.count({
			where: {
				name: {
					contains: query,
					mode: "insensitive",
				},
			},
		})) / 3,
	);

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
		<Container>
			<h1 className="mb-8 text-center font-bold text-4xl">Explore Companies</h1>
			<SearchBar initialQuery={query} />

			<CompanyList companies={companies} totalPages={totalPages} page={page} />
		</Container>
	);
}
