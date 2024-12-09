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
import Link from "next/link";
import { UserAdminButtonChangeStatus } from "./user-admin-button-change-status";
import { UserAdminButtonDelete } from "./user-admin-button-delete";

interface UserTableProps {
	users: User[];
}

export function UserTable({ users }: UserTableProps) {
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
				{users.map((user) => (
					<TableRow key={user.id}>
						<TableCell>{user.name}</TableCell>
						<TableCell>{user.email}</TableCell>
						<TableCell>{user.role}</TableCell>
						<TableCell>{user.status}</TableCell>
						<TableCell className="flex items-center space-x-2">
							<Button variant="outline" size="sm" asChild>
								<Link href={`/admin/users/${user.id}`}> View Details</Link>
							</Button>
							<UserAdminButtonChangeStatus
								redirectUrl="/admin/users"
								id={user.id}
								user={user}
							/>
							<UserAdminButtonDelete redirectUrl="/admin/users" id={user.id} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
