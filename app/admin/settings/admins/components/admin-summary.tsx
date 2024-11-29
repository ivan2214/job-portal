import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@prisma/client";
import { UserCheck, UserX } from "lucide-react";

interface AdminSummaryProps {
	admins: User[];
}

export function AdminSummary({ admins }: AdminSummaryProps) {
	const activeAdmins = admins.filter(
		(admin) => admin.status === "ACTIVE",
	).length;
	const suspendedAdmins = admins.filter(
		(admin) => admin.status === "SUSPENDED",
	).length;

	return (
		<div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<Card>
				<CardHeader className="space- y-0 flex flex-row items-center justify-between pb-2">
					<CardTitle className="font-medium text-sm">Total Admins</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="font-bold text-2xl">{admins.length}</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="font-medium text-sm">Active Admins</CardTitle>
					<UserCheck className="h-4 w-4 text-green-500" />
				</CardHeader>
				<CardContent>
					<div className="font-bold text-2xl">{activeAdmins}</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="font-medium text-sm">
						Suspended Admins
					</CardTitle>
					<UserX className="h-4 w-4 text-red-500" />
				</CardHeader>
				<CardContent>
					<div className="font-bold text-2xl">{suspendedAdmins}</div>
				</CardContent>
			</Card>
		</div>
	);
}
