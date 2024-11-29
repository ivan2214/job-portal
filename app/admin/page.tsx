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
import { prisma } from "@/db";

import { AdminChart } from "./components/admin-chart";
import { Eye, Pencil, Trash } from "lucide-react";
import Link from "next/link";

interface AdminDashboardProps {
	searchParams?: {
		filter?: "users" | "employers" | "jobs";
		query?: string;
		page?: string;
		type?: string;
	};
}

export default async function AdminDashboard({
	searchParams,
}: AdminDashboardProps) {
	const { filter, query, page, type } = (await searchParams) || {};

	const users = await prisma.user.findMany({
		take: 10,
	});

	const companies = await prisma.company.findMany({
		take: 10,
	});

	const jobs = await prisma.job.findMany({
		take: 10,
		include: {
			categoryJob: true,
			company: true,
			_count: true,
		},
	});

	const usersTotal = await prisma.user.count();

	const companiesTotal = await prisma.company.count();

	const jobsTotal = await prisma.job.count();

	const applicationsTotal = await prisma.application.count();

	const currentYear = new Date().getFullYear();

	function groupByMonth(data: { createdAt: Date }[]) {
		return data.reduce((acc, item) => {
			const month = item.createdAt.getMonth(); // 0 (enero) a 11 (diciembre)
			if (!acc[month]) {
				acc[month] = 0;
			}
			acc[month] += 1;
			return acc;
		}, Array(12).fill(0)); // Inicializa un array con 12 posiciones (uno por cada mes)
	}

	// Obtener los datos de usuarios, compañías, empleos y aplicaciones por año
	const usersByYear = await prisma.user.findMany({
		where: {
			createdAt: {
				gte: new Date(currentYear, 0, 1),
				lte: new Date(currentYear, 11, 31),
			},
		},
	});

	const companiesByYear = await prisma.company.findMany({
		where: {
			createdAt: {
				gte: new Date(currentYear, 0, 1),
				lte: new Date(currentYear, 11, 31),
			},
		},
	});

	const jobsByYear = await prisma.job.findMany({
		where: {
			createdAt: {
				gte: new Date(currentYear, 0, 1),
				lte: new Date(currentYear, 11, 31),
			},
		},
	});

	const applicationsByYear = await prisma.application.findMany({
		where: {
			createdAt: {
				gte: new Date(currentYear, 0, 1),
				lte: new Date(currentYear, 11, 31),
			},
		},
	});

	// Agrupar los datos por mes
	const usersByMonth = groupByMonth(usersByYear);
	const companiesByMonth = groupByMonth(companiesByYear);
	const jobsByMonth = groupByMonth(jobsByYear);
	const applicationsByMonth = groupByMonth(applicationsByYear);

	// Crear el formato de salida
	const data = usersByMonth.map((_, index) => ({
		name: new Date(currentYear, index, 1).toLocaleString("default", {
			month: "long",
		}), // Nombre del mes
		usuarios: usersByMonth[index],
		compañias: companiesByMonth[index],
		empleos: jobsByMonth[index],
		aplicaciones: applicationsByMonth[index],
	}));

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
						<div className="font-bold text-2xl">{usersTotal}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">Empresas</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">{companiesTotal}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">
							Empleos Publicados
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">{jobsTotal}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">Postulaciones</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">{applicationsTotal}</div>
					</CardContent>
				</Card>
			</div>

			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Estadísticas Mensuales</CardTitle>
				</CardHeader>
				<CardContent>
					<AdminChart data={data} />
				</CardContent>
			</Card>

			<div className="space-y-8">
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
									<TableHead>Tipo</TableHead>
									<TableHead>Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{users.map((user) => {
									return (
										<TableRow key={user.id}>
											<TableCell>{user.name}</TableCell>
											<TableCell>{user.email}</TableCell>
											<TableCell>{user.role}</TableCell>
											<TableCell>
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
												<Button variant="outline" size="sm" className="">
													<Pencil className="mr-2 h-4 w-4" size={20} />
													Editar
												</Button>
												<Button variant="destructive" size="sm">
													<Trash className="mr-2 h-4 w-4" size={20} />
													Eliminar
												</Button>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Gestión de Empresas</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="mb-4 flex justify-between">
							<Input placeholder="Buscar empleos..." className="max-w-sm" />
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
									<TableHead>Empresa</TableHead>
									<TableHead>Ubicación</TableHead>
									<TableHead>Email</TableHead>
									<TableHead>Teléfono</TableHead>
									<TableHead>Posiciones Abiertas</TableHead>
									<TableHead>Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{companies.map((company) => {
									return (
										<TableRow key={company.userId}>
											<TableCell>{company.name}</TableCell>
											<TableCell>{company.location}</TableCell>
											<TableCell>{company.email}</TableCell>
											<TableCell>{company.phone}</TableCell>
											<TableCell>{company.openPositions}</TableCell>
											<TableCell>
												<Button
													variant="outline"
													size="sm"
													className="mr-2"
													asChild
												>
													<Link href={`/admin/employers/${company.userId}`}>
														<Eye className="mr-2 h-4 w-4" size={20} />
														Ver
													</Link>
												</Button>
												<Button variant="outline" size="sm" className="">
													<Pencil className="mr-2 h-4 w-4" size={20} />
													Editar
												</Button>
												<Button variant="destructive" size="sm">
													<Trash className="mr-2 h-4 w-4" size={20} />
													Eliminar
												</Button>
											</TableCell>
										</TableRow>
									);
								})}
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
							<Input placeholder="Buscar empleos..." className="max-w-sm" />
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
								{jobs.map((job) => {
									return (
										<TableRow key={job.id}>
											<TableCell>{job.title}</TableCell>
											<TableCell>{job.company?.name}</TableCell>
											<TableCell>{job.applicationStatus}</TableCell>
											<TableCell>
												<Button
													variant="outline"
													size="sm"
													className="mr-2"
													asChild
												>
													<Link href={`/admin/jobs/${job.id}`}>
														<Eye className="mr-2 h-4 w-4" size={20} />
														Ver
													</Link>
												</Button>
												<Button variant="outline" size="sm" className="">
													<Pencil className="mr-2 h-4 w-4" size={20} />
													Editar
												</Button>
												<Button variant="destructive" size="sm">
													<Trash className="mr-2 h-4 w-4" size={20} />
													Eliminar
												</Button>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
