"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function ApplicationsHeader({
	initialSearch,
	initialSort,
}: { initialSearch: string; initialSort: string }) {
	const [search, setSearch] = useState(initialSearch);
	const [sort, setSort] = useState(initialSort);
	const router = useRouter();

	const handleSearch = () => {
		router.push(
			`/admin/applications?search=${encodeURIComponent(search)}&sort=${sort}`,
		);
	};

	const handleSort = (value: string) => {
		setSort(value);
		router.push(
			`/admin/applications?search=${encodeURIComponent(search)}&sort=${value}`,
		);
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
				<SelectContent>
					<SelectItem value="date">Date</SelectItem>
					<SelectItem value="job_title">Job Title</SelectItem>
					<SelectItem value="applicant_name">Applicant Name</SelectItem>
					<SelectItem value="status">Status</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
