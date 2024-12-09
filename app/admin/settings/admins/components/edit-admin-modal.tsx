import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { User } from "@prisma/client";
import { useState } from "react";

interface EditAdminModalProps {
	isOpen: boolean;
	onClose: () => void;
	onEdit: (updatedAdmin: User) => void;
	admin: User;
}

export function EditAdminModal({
	isOpen,
	onClose,
	onEdit,
	admin,
}: EditAdminModalProps) {
	const [editAdmin, setEditAdmin] = useState<User | null>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (admin) {
			onEdit({ ...admin });
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Admin</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="edit-name" className="text-right">
								Name
							</Label>
							<Input id="edit-name" className="col-span-3" required />
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="edit-email" className="text-right">
								Email
							</Label>
							<Input
								id="edit-email"
								type="email"
								className="col-span-3"
								required
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="edit-role" className="text-right">
								Role
							</Label>
							<Select>
								<SelectTrigger className="col-span-3">
									<SelectValue placeholder="Select a role" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Super Admin">Super Admin</SelectItem>
									<SelectItem value="Admin">Admin</SelectItem>
									<SelectItem value="Moderator">Moderator</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Update Admin</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
