"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { type Job, TypeJob } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

const typeJobs: {
	value: TypeJob;
	text: string;
}[] = [
	{
		value: TypeJob.FULL_TIME,
		text: "Tiempo completo",
	},
	{
		value: TypeJob.PART_TIME,
		text: "Tiempo parcial",
	},
	{
		value: TypeJob.INTERN,
		text: "Interno",
	},

	{
		value: TypeJob.CONTRACT,
		text: "Contrato",
	},
	{
		value: TypeJob.TEMPORARY,
		text: "Temporal",
	},
	{
		value: TypeJob.VOLUNTARY,
		text: "Voluntario",
	},
	{
		value: TypeJob.PERMANENT,
		text: "Permanente",
	},
	{
		value: TypeJob.OTHER,
		text: "Otro",
	},
];

export function Sidebar({
	categories,
	categoryActive,
	locationsActive,
	jobTypeActive,
}: {
	jobs: Job[];
	categories: {
		id: string;
		name: string;
	}[];
	categoryActive?: string;

	locationsActive?: string;
	jobTypeActive?: TypeJob;
}) {
	const [searchLocation, setSearchLocation] = useState(locationsActive);

	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const handleSearchLocation = () => {
		const params = new URLSearchParams(searchParams.toString());
		if (searchLocation) {
			params.set("location", searchLocation); // Add search term
		} else {
			params.delete("location"); // Remove search term if empty
		}
		router.push(`${pathname}?${params.toString()}`); // Update the URL
	};

	const handleCategory = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		if (value) {
			params.set("category", value); // Add search term
		} else {
			params.delete("category"); // Remove search term if empty
		}

		if (value === "All") {
			params.delete("category"); // Remove search term if empty
		}

		router.push(`${pathname}?${params.toString()}`); // Update the URL
	};

	const handleJobType = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		if (value) {
			params.set("jobType", value); // Add search term
		} else {
			params.delete("jobType"); // Remove search term if empty
		}

		if (value === "All") {
			params.delete("jobType"); // Remove search term if empty
		}

		router.push(`${pathname}?${params.toString()}`); // Update the URL
	};

	return (
		<aside className="h-full rounded border p-4 lg:w-64">
			<h2 className="mb-4 font-semibold text-lg">Filtros</h2>
			<div className="space-y-4">
				<div>
					<Label htmlFor="category">Categoría</Label>
					<Select onValueChange={handleCategory} value={categoryActive || ""}>
						<SelectTrigger id="category">
							<SelectValue placeholder="Seleccionar categoría" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="All">Todas las categorías</SelectItem>
							<SelectGroup>
								{categories.map((category) => (
									<SelectItem key={category.id} value={category.name}>
										{category.name}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<form
					onSubmit={(e) => {
						e.preventDefault();

						handleSearchLocation();
					}}
					className="flex w-full space-x-2"
				>
					<Input
						type="search"
						placeholder="Buscar por ubicación"
						value={searchLocation}
						onChange={(e) => setSearchLocation(e.target.value)}
						className="flex-grow"
					/>
					<Button onClick={handleSearchLocation}>Search</Button>
				</form>
				<div>
					<Label htmlFor="job-type">Tipo de empleo</Label>
					<Select onValueChange={handleJobType} value={jobTypeActive || ""}>
						<SelectTrigger id="job-type">
							<SelectValue placeholder="Seleccionar tipo" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="All">Todos</SelectItem>
							<SelectGroup>
								{typeJobs.map((typeJob) => (
									<SelectItem key={typeJob.value} value={typeJob.value}>
										{typeJob.text}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
		</aside>
	);
}
