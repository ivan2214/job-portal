"use client";

import { useState } from "react";
import { JobApplicationsTable } from "./job-applications-table";
import { FilterBar } from "./filter-bar";
import { SearchBar } from "./search-bar";

// Mock data for job applications
const mockApplications = [
	{
		id: 1,
		applicantName: "John Doe",
		jobTitle: "Software Engineer",
		status: "Pending",
	},
	{
		id: 2,
		applicantName: "Jane Smith",
		jobTitle: "Product Manager",
		status: "Accepted",
	},
	{
		id: 3,
		applicantName: "Bob Johnson",
		jobTitle: "UX Designer",
		status: "Rejected",
	},
	// Add more mock data as needed
];

export function JobApplicationsDashboard() {
	const [filteredApplications, setFilteredApplications] =
		useState(mockApplications);
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
		let filtered = mockApplications.filter((app) =>
			app.applicantName.toLowerCase().includes(search.toLowerCase()),
		);

		if (status !== "All") {
			filtered = filtered.filter((app) => app.status === status);
		}

		if (title !== "All") {
			filtered = filtered.filter((app) => app.jobTitle === title);
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
