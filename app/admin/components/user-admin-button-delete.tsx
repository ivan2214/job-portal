"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
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
import { useTransition } from "react";
import { deleteUser } from "../actions/user";
import { toast } from "sonner";

interface UserAdminButtonDeleteProps {
	id: string;
}

export const UserAdminButtonDelete: React.FC<UserAdminButtonDeleteProps> = ({
	id,
}) => {
	const [isPending, startTransition] = useTransition();

	const handleDelete = async () => {
		startTransition(() => {
			deleteUser(id).then((data) => {
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
				<Button variant="destructive" className="justify-start">
					<Trash className="mr-2 h-4 w-4" />
					Delete User
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete User</AlertDialogTitle>
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
							<Trash className="mr-2 h-4 w-4" />
							{isPending ? "Deleting..." : "Delete"}
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
