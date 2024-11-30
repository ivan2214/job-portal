"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

export function WithdrawConfirmationModal({}) {
	const onClose = () => {};
	const onConfirm = () => {};

	const isOpen = false;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Withdraw Application</DialogTitle>
					<DialogDescription>
						Are you sure you want to withdraw your application? This action
						cannot be undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button variant="destructive" onClick={onConfirm}>
						Withdraw
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
