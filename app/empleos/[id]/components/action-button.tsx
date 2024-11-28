"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ActionButtons({ jobId }: { jobId: string }) {
	console.log("Job ID:", jobId);

	const [isApplying, setIsApplying] = useState(false);
	const router = useRouter();

	const handleApply = async () => {
		setIsApplying(true);
		// In a real application, you would send a delete request to your backend here
		// For this example, we'll just simulate a delay
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setIsApplying(false);
		router.push("/empleos");
	};

	return (
		<div className="flex items-center justify-between p-4">
			<Link href="/empleos" passHref>
				<Button variant="outline">Back to Jobs</Button>
			</Link>
			<div className="space-x-4">
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button>Aplicar a la vacante</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete the
								job posting and remove all associated data from our servers.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={handleApply} disabled={isApplying}>
								{isApplying ? "Aplicando..." : "Aplicar"}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	);
}
