"use client";

import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface PaginationProps {
	totalPages: number;
}

export function PaginationAdminUser({ totalPages }: PaginationProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const currentPage = Number(searchParams.get("page")) || 1;

	const createPageURL = (pageNumber: number | string) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", pageNumber.toString());
		return `/admin/users?${params.toString()}`;
	};

	return (
		<div className="flex items-center justify-between">
			<Button
				variant="outline"
				size="sm"
				onClick={() => {
					startTransition(() => {
						router.push(createPageURL(currentPage - 1));
					});
				}}
				disabled={currentPage === 1 || isPending}
			>
				Previous
			</Button>
			<div className="flex items-center space-x-2">
				<span className="font-medium text-sm">
					Page {currentPage} of {totalPages}
				</span>
				<Select
					value={currentPage.toString()}
					onValueChange={(value) => {
						startTransition(() => {
							router.push(createPageURL(value));
						});
					}}
				>
					<SelectTrigger className="w-[70px]">
						<SelectValue placeholder="Page" />
					</SelectTrigger>
					<SelectContent>
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
							<SelectItem key={page} value={page.toString()}>
								{page}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<Button
				variant="outline"
				size="sm"
				onClick={() => {
					startTransition(() => {
						router.push(createPageURL(currentPage + 1));
					});
				}}
				disabled={currentPage === totalPages || isPending}
			>
				Next
			</Button>
		</div>
	);
}
