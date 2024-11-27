"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchBar({ initialQuery = "" }) {
	const [query, setQuery] = useState(initialQuery);
	const router = useRouter();

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		router.push(`/empresas?query=${encodeURIComponent(query)}`);
	};

	return (
		<form onSubmit={handleSearch} className="mb-8 flex gap-2">
			<Input
				type="text"
				placeholder="Search companies by name or location"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="flex-grow"
			/>
			<Button type="submit" className="flex-shrink-0">
				<Search className="mr-2 h-4 w-4" /> Search
			</Button>
		</form>
	);
}
