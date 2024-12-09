"use client";

import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { UserWithRelations } from "@/types";

type Application = {
	id: number;
	company: string;
	position: string;
	date: string;
	status: "Pendiente" | "Aceptada" | "Rechazada";
};

const initialApplications: Application[] = [
	{
		id: 1,
		company: "TechCorp",
		position: "Desarrollador Frontend",
		date: "2023-05-15",
		status: "Pendiente",
	},
	{
		id: 2,
		company: "InnoSoft",
		position: "Ingeniero de Software",
		date: "2023-05-10",
		status: "Aceptada",
	},
	{
		id: 3,
		company: "DataCo",
		position: "Analista de Datos",
		date: "2023-05-05",
		status: "Rechazada",
	},
];

export function ApplicationManagement({
	user,
}: {
	user: UserWithRelations;
}) {
	const applications = user.applications || [];

	return (
		<div>
			<h2 className="mb-4 font-bold text-2xl">Mis Postulaciones</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Empresa</TableHead>
						<TableHead>Puesto</TableHead>
						<TableHead>Fecha</TableHead>
						<TableHead>Estado</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{applications.map((app) => (
						<TableRow key={app.id}>
							<TableCell>{app.job?.company?.name}</TableCell>
							<TableCell>{app.job?.title}</TableCell>
							<TableCell>{app.dateApplied.toLocaleDateString()}</TableCell>
							<TableCell>
								<Badge
									variant={
										app.status === "ACCEPTED"
											? "success"
											: app.status === "PENDING"
												? "pending"
												: app.status === "REJECTED"
													? "destructive"
													: "default"
									}
								>
									{app.status}
								</Badge>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
