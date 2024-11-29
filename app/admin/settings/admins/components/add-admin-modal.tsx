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
import { useState } from "react";

export type newAdmin = {
	name: string;
	email: string;
	role: string;
};

interface AddAdminModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAdd: (newAdmin: { name: string; email: string; role: string }) => void;
}

export function AddAdminModal({ isOpen, onClose, onAdd }: AddAdminModalProps) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onAdd({ name, email, role });
		setName("");
		setEmail("");
		setRole("");
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New Admin</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Input
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="col-span-3"
								required
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="email" className="text-right">
								Email
							</Label>
							<Input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="col-span-3"
								required
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="role" className="text-right">
								Role
							</Label>
							<Select onValueChange={setRole} required>
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
						<Button type="submit">Add Admin</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
