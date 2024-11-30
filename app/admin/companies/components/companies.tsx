"use client";

import SuspendCompanieButton from "@/components/suspend-company-button";
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
import type { CompanyWithRelations } from "@/types";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Companies({
	companies,
}: {
	companies: CompanyWithRelations[];
}) {
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");

	const pageSize = 10;

	const totalCount = companies.length;

	const totalPages = Math.ceil(totalCount / pageSize);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Total Companies: {totalCount}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="mb-4">
					<Input
						placeholder="Search companies..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="max-w-sm"
					/>
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="cursor-pointer">
								Company Name <ArrowUpDown size={16} />
							</TableHead>
							<TableHead className="cursor-pointer">
								Email <ArrowUpDown size={16} />
							</TableHead>
							<TableHead className="cursor-pointer">
								Jobs Count <ArrowUpDown size={16} />
							</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{companies.map((company) => (
							<TableRow key={company.userId}>
								<TableCell>{company.name}</TableCell>
								<TableCell>{company.email}</TableCell>
								<TableCell>{company.jobPostings?.length}</TableCell>
								<TableCell>
									<Button variant="outline" size="sm" className="mr-2" asChild>
										<Link href={`/admin/companies/${company.userId}`}>
											View Details
										</Link>
									</Button>
									<SuspendCompanieButton companyId={String(company.userId)} />
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
