"use client";

import SuspendEmployerButton from "@/components/suspend-employer-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock data function
const getEmployers = (page: number, pageSize: number, search: string) => {
	const allEmployers = Array.from({ length: 100 }, (_, i) => ({
		id: i + 1,
		companyName: `Company ${i + 1}`,
		email: `company${i + 1}@example.com`,
		jobsCount: Math.floor(Math.random() * 20),
	}));

	const filteredEmployers = allEmployers.filter(
		(employer) =>
			employer.companyName.toLowerCase().includes(search.toLowerCase()) ||
			employer.email.toLowerCase().includes(search.toLowerCase()),
	);

	const startIndex = (page - 1) * pageSize;
	const paginatedEmployers = filteredEmployers.slice(
		startIndex,
		startIndex + pageSize,
	);

	return {
		employers: paginatedEmployers,
		totalCount: filteredEmployers.length,
	};
};

export function Employers() {
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");
	const [sortColumn, setSortColumn] = useState<string | null>(null);
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
	const pageSize = 10;

	const { employers, totalCount } = getEmployers(currentPage, pageSize, search);

	const totalPages = Math.ceil(totalCount / pageSize);

	const handleSort = (column: string) => {
		if (sortColumn === column) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortColumn(column);
			setSortDirection("asc");
		}
	};

	const sortedEmployers = [...employers].sort((a, b) => {
		if (!sortColumn) return 0;
		if (a[sortColumn as keyof typeof a] < b[sortColumn as keyof typeof b]) {
			return sortDirection === "asc" ? -1 : 1;
		}
		if (a[sortColumn as keyof typeof a] > b[sortColumn as keyof typeof b]) {
			return sortDirection === "asc" ? 1 : -1;
		}
		return 0;
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Total Employers: {totalCount}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="mb-4">
					<Input
						placeholder="Search employers..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="max-w-sm"
					/>
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead
								onClick={() => handleSort("companyName")}
								className="cursor-pointer"
							>
								Company Name <ArrowUpDown size={16} />
							</TableHead>
							<TableHead
								onClick={() => handleSort("email")}
								className="cursor-pointer"
							>
								Email <ArrowUpDown size={16} />
							</TableHead>
							<TableHead
								onClick={() => handleSort("jobsCount")}
								className="cursor-pointer"
							>
								Jobs Count <ArrowUpDown size={16} />
							</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sortedEmployers.map((employer) => (
							<TableRow key={employer.id}>
								<TableCell>{employer.companyName}</TableCell>
								<TableCell>{employer.email}</TableCell>
								<TableCell>{employer.jobsCount}</TableCell>
								<TableCell>
									<Button variant="outline" size="sm" className="mr-2" asChild>
										<Link href={`/admin/employers/${employer.id}`}>
											View Details
										</Link>
									</Button>
									<SuspendEmployerButton employerId={String(employer.id)} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<div className="mt-4 flex items-center justify-between">
					<div>
						Page {currentPage} of {totalPages}
					</div>
					<div>
						<Button
							variant="outline"
							size="sm"
							onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
							disabled={currentPage === 1}
							className="mr-2"
						>
							<ChevronLeft size={16} />
							Previous
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() =>
								setCurrentPage((page) => Math.min(totalPages, page + 1))
							}
							disabled={currentPage === totalPages}
						>
							Next
							<ChevronRight size={16} />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
