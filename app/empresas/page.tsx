import { Container } from "@/components/container";
import CompanyList from "./components/company-list";
import SearchBar from "./components/search-bar";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Explore Companies | YourPlatform",
	description: "Browse and discover companies registered on our platform.",
};

export default function CompaniesPage({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const query =
		typeof searchParams.query === "string" ? searchParams.query : "";
	const page =
		typeof searchParams.page === "string"
			? Number.parseInt(searchParams.page, 10)
			: 1;

	return (
		<Container>
			<h1 className="mb-8 text-center font-bold text-4xl">Explore Companies</h1>
			<SearchBar initialQuery={query} />

			<CompanyList query={query} page={page} />
		</Container>
	);
}
