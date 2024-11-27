import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FilterProps {
	onFilter: (titleFilter: string, locationFilter: string) => void;
}

export default function Filter({ onFilter }: FilterProps) {
	const [titleFilter, setTitleFilter] = useState("");
	const [locationFilter, setLocationFilter] = useState("");

	const handleFilter = () => {
		onFilter(titleFilter, locationFilter);
	};

	return (
		<div className="flex space-x-4">
			<Input
				placeholder="Filter by job title"
				value={titleFilter}
				onChange={(e) => setTitleFilter(e.target.value)}
			/>
			<Input
				placeholder="Filter by location"
				value={locationFilter}
				onChange={(e) => setLocationFilter(e.target.value)}
			/>
			<Button onClick={handleFilter}>Apply Filters</Button>
		</div>
	);
}
