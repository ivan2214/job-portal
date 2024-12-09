"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export function SearchBar() {
	const [query, setQuery] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		setQuery(newQuery);
	};

	return (
		<div className="relative">
			<Search className="-translate-y-1/2 absolute top-1/2 left-2 h-4 w-4 transform text-gray-500" />
			<Input
				type="text"
				placeholder="Search admins..."
				value={query}
				onChange={handleChange}
				className="w-64 pl-8"
			/>
		</div>
	);
}
