"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ApplicationsHeader({
	initialSearch,
	initialSort,
}: { initialSearch: string; initialSort: string }) {
	const [search, setSearch] = useState(initialSearch);
	const [sort, setSort] = useState(initialSort);
	const [sortType, setSortType] = useState<"asc" | "desc">("desc");
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	// Handle the search input change
	const handleSearch = () => {
		const params = new URLSearchParams(searchParams.toString());
		if (search) {
			params.set("search", search); // Add search term
		} else {
			params.delete("search"); // Remove search term if empty
		}
		router.push(`${pathname}?${params.toString()}`); // Update the URL
	};

	// Handle sorting by selected value
	const handleSort = (value: string) => {
		setSort(value);
		const params = new URLSearchParams(searchParams.toString());
		params.set("sort", value); // Set the selected sort option
		router.push(`${pathname}?${params.toString()}`); // Update the URL
	};

	// Handle sorting by selected sort order (ascending or descending)
	const handleSortType = (value: "asc" | "desc") => {
		setSortType(value);
		const params = new URLSearchParams(searchParams.toString());
		params.set("sortType", value); // Set the sort type (asc or desc)
		router.push(`${pathname}?${params.toString()}`); // Update the URL
	};

	return (
		<div className="mb-6 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-x-4 md:space-y-0">
			<div className="flex w-full space-x-2 md:w-1/2">
				<Input
					type="text"
					placeholder="Search by name, job title, or status"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="flex-grow"
				/>
				<Button onClick={handleSearch}>Search</Button>
			</div>
			<Select value={sort} onValueChange={handleSort}>
				<SelectTrigger className="w-full md:w-[180px]">
					<SelectValue placeholder="Sort by" />
				</SelectTrigger>
				<SelectContent defaultValue={initialSort}>
					<SelectItem value="createdAt">Date</SelectItem>
					<SelectItem value="status">Status</SelectItem>
				</SelectContent>
			</Select>
			<Select value={sortType} onValueChange={handleSortType}>
				<SelectTrigger className="w-full md:w-[180px]">
					<SelectValue placeholder="Sort by" />
				</SelectTrigger>
				<SelectContent defaultValue="desc">
					<SelectItem value="asc">Ascending</SelectItem>
					<SelectItem value="desc">Descending</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
