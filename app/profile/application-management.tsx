"use client";

import { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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

export function ApplicationManagement() {
	const [applications, setApplications] =
		useState<Application[]>(initialApplications);

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
							<TableCell>{app.company}</TableCell>
							<TableCell>{app.position}</TableCell>
							<TableCell>{app.date}</TableCell>
							<TableCell>
								<Badge
									variant={
										app.status === "Aceptada"
											? "success"
											: app.status === "Rechazada"
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
