"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

export default function SuspendCompanyButton({
	companyId,
}: { companyId: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	console.log("Company ID:", companyId);

	const handleSuspend = async () => {
		setIsLoading(true);
		// Here you would typically call an API to suspend the company
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API call
		setIsLoading(false);
		setIsOpen(false);
		// You might want to show a success message or update the UI here
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="destructive">Suspend Company</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Suspend Company</DialogTitle>
					<DialogDescription>
						Are you sure you want to suspend this company? This action will
						prevent them from posting new jobs and accessing their account.
					</DialogDescription>
				</DialogHeader>
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Warning</AlertTitle>
					<AlertDescription>
						This action is reversible but may have significant consequences for
						the company.
					</AlertDescription>
				</Alert>
				<DialogFooter>
					<Button variant="outline" onClick={() => setIsOpen(false)}>
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={handleSuspend}
						disabled={isLoading}
					>
						{isLoading ? "Suspending..." : "Confirm Suspension"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
