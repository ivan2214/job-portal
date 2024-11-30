"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
	onSearch: (term: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = () => {
		onSearch(searchTerm);
	};

	return (
		<div className="flex w-full max-w-sm items-center space-x-2">
			<Input
				type="text"
				placeholder="Search by applicant name"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<Button type="submit" onClick={handleSearch}>
				<Search className="h-4 w-4" />
			</Button>
		</div>
	);
}
