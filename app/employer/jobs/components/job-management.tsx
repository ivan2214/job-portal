"use client";

import { useState } from "react";
import JobTable from "./job-table";
import Filter from "./filter";
import Pagination from "./pagination";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

// Mock data for jobs
const initialJobs = [
	{
		id: 1,
		title: "Software Engineer",
		location: "New York, NY",
		applications: 15,
	},
	{
		id: 2,
		title: "Product Manager",
		location: "San Francisco, CA",
		applications: 8,
	},
	{
		id: 3,
		title: "UX Designer",
		location: "Los Angeles, CA",
		applications: 12,
	},
	{ id: 4, title: "Data Analyst", location: "Chicago, IL", applications: 6 },
	{
		id: 5,
		title: "Marketing Specialist",
		location: "Boston, MA",
		applications: 10,
	},
];

export default function JobManagement() {
	const [jobs, setJobs] = useState(initialJobs);
	const [filteredJobs, setFilteredJobs] = useState(initialJobs);
	const [currentPage, setCurrentPage] = useState(1);
	const jobsPerPage = 5;

	const handleFilter = (titleFilter: string, locationFilter: string) => {
		const filtered = jobs.filter(
			(job) =>
				job.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
				job.location.toLowerCase().includes(locationFilter.toLowerCase()),
		);
		setFilteredJobs(filtered);
		setCurrentPage(1);
	};

	const handleDelete = (id: number) => {
		const updatedJobs = jobs.filter((job) => job.id !== id);
		setJobs(updatedJobs);
		setFilteredJobs(updatedJobs);
	};

	const indexOfLastJob = currentPage * jobsPerPage;
	const indexOfFirstJob = indexOfLastJob - jobsPerPage;
	const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<Filter onFilter={handleFilter} />
				<Button className="bg-green-600 hover:bg-green-700">
					<PlusCircle className="mr-2 h-4 w-4" /> Post New Job
				</Button>
			</div>
			<JobTable jobs={currentJobs} onDelete={handleDelete} />
			<Pagination
				currentPage={currentPage}
				totalPages={Math.ceil(filteredJobs.length / jobsPerPage)}
				onPageChange={setCurrentPage}
			/>
		</div>
	);
}
