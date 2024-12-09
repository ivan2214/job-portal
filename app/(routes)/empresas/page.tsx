import { Container } from "@/components/container";
import type { Metadata } from "next";
import CompanyList from "./components/company-list";
import SearchBar from "./components/search-bar";

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

	return (
		<Container>
			<h1 className="mb-8 text-center font-bold text-4xl">Explore Companies</h1>
			<SearchBar initialQuery={query} />

			<CompanyList query={query} page={page} />
		</Container>
	);
}
