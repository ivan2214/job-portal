"use client";

import { Button } from "@/components/ui/button";
import type { Application, Job } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Filter from "./filter";
import JobTable from "./job-table";
import Pagination from "./pagination";

export default function JobManagement({
	jobs,
}: {
	jobs: (Job & {
		applications: Application[] | null;
	})[];
}) {
	const [filteredJobs, setFilteredJobs] = useState(jobs);
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

	const handleDelete = (id: string) => {
		// Lógica para eliminar el trabajo
		console.log("Eliminar trabajo", id);
	};

	const indexOfLastJob = currentPage * jobsPerPage;
	const indexOfFirstJob = indexOfLastJob - jobsPerPage;
	const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<Filter onFilter={handleFilter} />
				<Button size="sm" asChild className="bg-green-600 hover:bg-green-700">
					<Link href="/company/jobs/new">
						<PlusCircle className="mr-2 h-4 w-4" /> Post New Job
					</Link>
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
