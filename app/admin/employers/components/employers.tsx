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
import type { Company, Job, User } from "@prisma/client";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Employers({
	employers,
}: {
	employers: (User & {
		company: Company | null;
		postedJobs: Job[];
	})[];
}) {
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");

	const pageSize = 10;

	const totalCount = employers.length;

	const totalPages = Math.ceil(totalCount / pageSize);

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
						{employers.map((employer) => (
							<TableRow key={employer.id}>
								<TableCell>{employer.company?.name}</TableCell>
								<TableCell>{employer.email}</TableCell>
								<TableCell>{employer.postedJobs.length}</TableCell>
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
