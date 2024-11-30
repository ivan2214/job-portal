"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
	onStatusFilter: (status: string) => void;
	onJobTitleFilter: (title: string) => void;
}

export function FilterBar({
	onStatusFilter,
	onJobTitleFilter,
}: FilterBarProps) {
	return (
		<div className="flex space-x-4">
			<Select onValueChange={onStatusFilter}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Filter by Status" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="All">All Statuses</SelectItem>
					<SelectItem value="Pending">Pending</SelectItem>
					<SelectItem value="Accepted">Accepted</SelectItem>
					<SelectItem value="Rejected">Rejected</SelectItem>
				</SelectContent>
			</Select>

			<Select onValueChange={onJobTitleFilter}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Filter by Job Title" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="All">All Job Titles</SelectItem>
					<SelectItem value="Software Engineer">Software Engineer</SelectItem>
					<SelectItem value="Product Manager">Product Manager</SelectItem>
					<SelectItem value="UX Designer">UX Designer</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
