import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { User } from "@prisma/client";
import { Eye } from "lucide-react";
import Link from "next/link";
import { UserAdminButtonDelete } from "../users/components/user-admin-button-delete";
import { UserAdminButtonEdit } from "../users/components/user-admin-button-edit";

interface UserAdminTableProps {
	users: User[];
}

export const UserAdminTable: React.FC<UserAdminTableProps> = ({ users }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Gestión de Usuarios</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="mb-4 flex justify-between">
					<Input placeholder="Buscar usuarios..." className="max-w-sm" />
					<Select>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Filtrar por tipo" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="todos">Todos</SelectItem>
							<SelectItem value="candidato">Candidato</SelectItem>
							<SelectItem value="empleador">Empleador</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Nombre</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Estado</TableHead>
							<TableHead>Email Verificado</TableHead>
							<TableHead>Acciones</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.map((user) => {
							return (
								<TableRow key={user.id}>
									<TableCell>{user.name}</TableCell>
									<TableCell className="truncate">{user.email}</TableCell>
									<TableCell>{user.status}</TableCell>
									<TableCell>{user.emailVerified ? "Si" : "No"}</TableCell>
									<TableCell className="flex items-center space-x-2">
										<Button
											variant="outline"
											size="sm"
											className="mr-2"
											asChild
										>
											<Link href={`/admin/users/${user.id}`}>
												<Eye className="mr-2 h-4 w-4" size={20} />
												Ver
											</Link>
										</Button>
										<UserAdminButtonEdit user={user} />
										<UserAdminButtonDelete id={user.id} />
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};
