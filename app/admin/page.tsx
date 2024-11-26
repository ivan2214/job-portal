"use client";

import { useState } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const data = [
	{ name: "Ene", usuarios: 400, empleadores: 240, empleos: 240 },
	{ name: "Feb", usuarios: 300, empleadores: 139, empleos: 221 },
	{ name: "Mar", usuarios: 200, empleadores: 980, empleos: 229 },
	{ name: "Abr", usuarios: 278, empleadores: 390, empleos: 200 },
	{ name: "May", usuarios: 189, empleadores: 480, empleos: 218 },
];

const usuarios = [
	{ id: 1, nombre: "Juan Pérez", email: "juan@example.com", tipo: "Candidato" },
	{
		id: 2,
		nombre: "María García",
		email: "maria@example.com",
		tipo: "Empleador",
	},
	{
		id: 3,
		nombre: "Carlos López",
		email: "carlos@example.com",
		tipo: "Candidato",
	},
];

const empleos = [
	{
		id: 1,
		titulo: "Desarrollador Frontend",
		empresa: "TechCo",
		estado: "Activo",
	},
	{ id: 2, titulo: "Diseñador UX", empresa: "DesignInc", estado: "Cerrado" },
	{
		id: 3,
		titulo: "Gerente de Proyecto",
		empresa: "ProjectPro",
		estado: "Activo",
	},
];

export default function AdminDashboard() {
	const [userFilter, setUserFilter] = useState("");
	const [jobFilter, setJobFilter] = useState("");

	const filteredUsers = usuarios.filter(
		(user) =>
			user.nombre.toLowerCase().includes(userFilter.toLowerCase()) ||
			user.email.toLowerCase().includes(userFilter.toLowerCase()),
	);

	const filteredJobs = empleos.filter(
		(job) =>
			job.titulo.toLowerCase().includes(jobFilter.toLowerCase()) ||
			job.empresa.toLowerCase().includes(jobFilter.toLowerCase()),
	);

	return (
		<div className="p-8">
			<h1 className="mb-8 font-bold text-3xl">Panel de Administración</h1>

			<div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">
							Usuarios Totales
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">1,367</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">Empleadores</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">2,229</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">
							Empleos Publicados
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">1,108</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">Postulaciones</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">3,782</div>
					</CardContent>
				</Card>
			</div>

			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Estadísticas Mensuales</CardTitle>
				</CardHeader>
				<CardContent>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={data}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey="usuarios" fill="#8884d8" />
							<Bar dataKey="empleadores" fill="#82ca9d" />
							<Bar dataKey="empleos" fill="#ffc658" />
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>

			<div className="space-y-8">
				<Card>
					<CardHeader>
						<CardTitle>Gestión de Usuarios</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="mb-4 flex justify-between">
							<Input
								placeholder="Buscar usuarios..."
								value={userFilter}
								onChange={(e) => setUserFilter(e.target.value)}
								className="max-w-sm"
							/>
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
									<TableHead>Tipo</TableHead>
									<TableHead>Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredUsers.map((user) => (
									<TableRow key={user.id}>
										<TableCell>{user.nombre}</TableCell>
										<TableCell>{user.email}</TableCell>
										<TableCell>{user.tipo}</TableCell>
										<TableCell>
											<Button variant="outline" size="sm" className="mr-2">
												Editar
											</Button>
											<Button variant="destructive" size="sm">
												Eliminar
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Gestión de Empleos</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="mb-4 flex justify-between">
							<Input
								placeholder="Buscar empleos..."
								value={jobFilter}
								onChange={(e) => setJobFilter(e.target.value)}
								className="max-w-sm"
							/>
							<Select>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Filtrar por estado" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="todos">Todos</SelectItem>
									<SelectItem value="activo">Activo</SelectItem>
									<SelectItem value="cerrado">Cerrado</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Título</TableHead>
									<TableHead>Empresa</TableHead>
									<TableHead>Estado</TableHead>
									<TableHead>Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredJobs.map((job) => (
									<TableRow key={job.id}>
										<TableCell>{job.titulo}</TableCell>
										<TableCell>{job.empresa}</TableCell>
										<TableCell>{job.estado}</TableCell>
										<TableCell>
											<Button variant="outline" size="sm" className="mr-2">
												Editar
											</Button>
											<Button variant="destructive" size="sm">
												Eliminar
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
