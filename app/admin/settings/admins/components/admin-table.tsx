"use client";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { User } from "@prisma/client";
import {} from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteAdmin } from "../actions/admin";
import { AdminButtonDelete } from "./admin-button-delete";
import { EditAdminModal } from "./edit-admin-modal";

interface AdminTableProps {
	admins: User[];
}

export function AdminTable({ admins }: AdminTableProps) {
	const [isPending, startTransition] = useTransition();

	const onEdit = (admin: User) => {
		console.log("Editing admin:", admin);
	};

	const onSuspend = (id: string) => {
		console.log("Suspend admin:", id);
	};

	const onRemove = (id: string) => {
		startTransition(() => {
			deleteAdmin(id).then((data) => {
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
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Role</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{admins.map((admin) => (
					<TableRow key={admin.id}>
						<TableCell>{admin.name}</TableCell>
						<TableCell>{admin.email}</TableCell>
						<TableCell>{admin.role}</TableCell>
						<TableCell>{admin.status}</TableCell>
						<TableCell>
							<div className="flex space-x-2">
								<EditAdminModal admin={admin} />

								<AdminButtonDelete
									name={admin.name || ""}
									email={admin.email}
									id={admin.id}
								/>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
