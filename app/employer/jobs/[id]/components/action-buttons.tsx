"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ActionButtons({ jobId }: { jobId: string }) {
	const [isClosing, setIsClosing] = useState(false);
	const router = useRouter();

	const handleEdit = () => {
		router.push(`/jobs/${jobId}/edit`);
	};

	const handleClose = async () => {
		setIsClosing(true);
		try {
			// This is where you would make an API call to close the job posting
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API call
			router.push("/jobs");
		} catch (error) {
			console.error("Failed to close job posting:", error);
			setIsClosing(false);
		}
	};

	return (
		<div className="flex gap-4">
			<Button onClick={handleEdit}>Edit Job</Button>
			<Button variant="destructive" onClick={handleClose} disabled={isClosing}>
				{isClosing ? "Closing..." : "Close Job Posting"}
			</Button>
		</div>
	);
}
