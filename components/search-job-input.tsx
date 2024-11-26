"use client";

import InputSearch from "@/components/ui/inputs/input-search";
import { ArrowRight, Search } from "lucide-react";

type SearchJobInputProps = {};

export const SearchJobInput: React.FC<SearchJobInputProps> = ({}) => {
	return (
		<InputSearch
			placeholder="Buscar Empleo"
			iconStart={<Search size={20} />}
			iconEnd={<ArrowRight size={20} />}
			onSubmit={() => console.log("Search submitted!")}
		/>
	);
};
