import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { User } from "@prisma/client";
import { Edit, UserMinus, UserX } from "lucide-react";

interface AdminTableProps {
	admins: User[];
	onEdit?: (admin: User) => void;
	onSuspend: (adminId: string) => void;
	onRemove: (adminId: string) => void;
}

export function AdminTable({ admins, onSuspend, onRemove }: AdminTableProps) {
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
								<Button
									variant="outline"
									size="sm"
									/* onClick={() => onEdit(admin)} */
								>
									<Edit className="h-4 w-4" />
								</Button>
								<Button
									variant="outline"
									size="sm"
									onClick={() => onSuspend(admin.id)}
									className={
										admin.status === "ACTIVE" ? "bg-yellow-100" : "bg-green-100"
									}
								>
									<UserX className="h-4 w-4" />
								</Button>
								<Button
									variant="outline"
									size="sm"
									onClick={() => onRemove(admin.id)}
									className="bg-red-100"
								>
									<UserMinus className="h-4 w-4" />
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
