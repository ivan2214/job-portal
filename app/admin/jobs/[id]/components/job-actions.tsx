"use client";

import { useState } from "react";
import { Pencil, Trash2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import type { JobWithRelations } from "@/types";

interface JobActionsProps {
	job: JobWithRelations;
}

export function JobActions({ job }: JobActionsProps) {
	const [isDeleting, setIsDeleting] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

	const handleDelete = async () => {
		setIsDeleting(true);
		// Add your delete logic here
		setIsDeleting(false);
	};

	const handleClose = async () => {
		setIsClosing(true);
		// Add your close logic here
		setIsClosing(false);
	};

	return (
		<div className="space-y-4">
			<h3 className="font-medium">Actions</h3>
			<div className="flex flex-col gap-2">
				<Button className="justify-start" asChild>
					<a href={`/admin/jobs/${job.id}/edit`}>
						<Pencil className="mr-2 h-4 w-4" />
						Edit Job
					</a>
				</Button>

				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant="destructive" className="justify-start">
							<Trash2 className="mr-2 h-4 w-4" />
							Delete Job
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Delete Job Posting</AlertDialogTitle>
							<AlertDialogDescription>
								Are you sure you want to delete this job posting? This action
								cannot be undone.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								onClick={handleDelete}
								className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
								disabled={isDeleting}
							>
								{isDeleting ? "Deleting..." : "Delete"}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>

				{job.applicationStatus === "PENDING" && (
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="outline" className="justify-start">
								<XCircle className="mr-2 h-4 w-4" />
								Close Job Posting
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Close Job Posting</AlertDialogTitle>
								<AlertDialogDescription>
									Are you sure you want to close this job posting? This will
									prevent new applications.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction onClick={handleClose} disabled={isClosing}>
									{isClosing ? "Closing..." : "Close"}
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				)}
			</div>
		</div>
	);
}
