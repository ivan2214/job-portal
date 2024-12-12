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
import { Trash } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteAdmin } from "../actions/admin";

interface AdminButtonDeleteProps {
	id: string;
	redirectUrl?: string;
}

export const AdminButtonDelete: React.FC<AdminButtonDeleteProps> = ({
	id,
	redirectUrl,
}) => {
	const [isPending, startTransition] = useTransition();

	const handleDelete = async () => {
		startTransition(() => {
			deleteAdmin(id, redirectUrl).then((data) => {
				if (data.error) {
					toast.error(data.error);
				}
				if (data.success) {
					toast.success(data.success);
				}
			});
		});
	};
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button title="Delete Admin" size="sm" variant="destructive">
					<Trash className="mr-2 h-4 w-4" size={20} />
					Delete
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete </AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure? This action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						disabled={isPending}
					>
						<Button variant="destructive" className="justify-start">
							<Trash className="mr-2 h-4 w-4" size={20} />
							{isPending ? "Deleting..." : "Delete"}
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
