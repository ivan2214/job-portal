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
import { useEffect, useState } from "react";

interface Admin {
	id: number;
	name: string;
	email: string;
	role: string;
	status: string;
}

interface EditAdminModalProps {
	isOpen: boolean;
	onClose: () => void;
	onEdit: (updatedAdmin: Admin) => void;
	admin: Admin | null;
}

export function EditAdminModal({
	isOpen,
	onClose,
	onEdit,
	admin,
}: EditAdminModalProps) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");

	useEffect(() => {
		if (admin) {
			setName(admin.name);
			setEmail(admin.email);
			setRole(admin.role);
		}
	}, [admin]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (admin) {
			onEdit({ ...admin, name, email, role });
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
							<Input
								id="edit-name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="col-span-3"
								required
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="edit-email" className="text-right">
								Email
							</Label>
							<Input
								id="edit-email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="col-span-3"
								required
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="edit-role" className="text-right">
								Role
							</Label>
							<Select onValueChange={setRole} defaultValue={role}>
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
