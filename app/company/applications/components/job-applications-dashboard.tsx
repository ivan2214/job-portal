"use client";

import type { Application, Job, User } from "@prisma/client";
import { useState } from "react";
import { FilterBar } from "./filter-bar";
import { JobApplicationsTable } from "./job-applications-table";
import { SearchBar } from "./search-bar";

export function JobApplicationsDashboard({
	applications,
}: {
	applications: (Application & {
		user: User | null;
		job: Job | null;
	})[];
}) {
	const [filteredApplications, setFilteredApplications] =
		useState(applications);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("All");
	const [jobTitleFilter, setJobTitleFilter] = useState("All");

	const handleSearch = (term: string) => {
		setSearchTerm(term);
		filterApplications(term, statusFilter, jobTitleFilter);
	};

	const handleStatusFilter = (status: string) => {
		setStatusFilter(status);
		filterApplications(searchTerm, status, jobTitleFilter);
	};

	const handleJobTitleFilter = (title: string) => {
		setJobTitleFilter(title);
		filterApplications(searchTerm, statusFilter, title);
	};

	const filterApplications = (
		search: string,
		status: string,
		title: string,
	) => {
		let filtered = applications.filter((app) =>
			app.user?.name.toLowerCase().includes(search.toLowerCase()),
		);

		if (status !== "All") {
			filtered = filtered.filter((app) => app.status === status);
		}

		if (title !== "All") {
			filtered = filtered.filter((app) => app.job?.title === title);
		}

		setFilteredApplications(filtered);
	};

	return (
		<div className="space-y-4">
			<div className="flex justify-between">
				<SearchBar onSearch={handleSearch} />
				<FilterBar
					onStatusFilter={handleStatusFilter}
					onJobTitleFilter={handleJobTitleFilter}
				/>
			</div>
			<JobApplicationsTable applications={filteredApplications} />
		</div>
	);
}
