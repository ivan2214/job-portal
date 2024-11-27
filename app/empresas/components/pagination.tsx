"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
	currentPage,
	totalPages,
}: { currentPage: number; totalPages: number }) {
	const router = useRouter();
	const pathname = usePathname();

	const handlePageChange = (page: number) => {
		router.push(`${pathname}?page=${page}`);
	};

	return (
		<div className="mt-8 flex items-center justify-center space-x-2">
			<Button
				variant="outline"
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				<ChevronLeft className="h-4 w-4" />
				Previous
			</Button>
			<span className="text-sm">
				Page {currentPage} of {totalPages}
			</span>
			<Button
				variant="outline"
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				Next
				<ChevronRight className="h-4 w-4" />
			</Button>
		</div>
	);
}
