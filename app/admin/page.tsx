import {} from "@/components/ui/card";
import {} from "@/components/ui/select";
import {} from "@/components/ui/table";
import { prisma } from "@/db";

import { Container } from "@/components/container";
import {} from "lucide-react";
import { AdminChart } from "./components/admin-chart";
import { AdminSummary } from "./components/admin-summary";
import { UserAdminTable } from "./components/user-admin-table";
import { CompanyAdminTable } from "./components/company-admin-table";
import { JobAdminTable } from "./components/job-admin-table";

type SearchParams = Promise<{
	filter?: "users" | "companies" | "jobs";
	query?: string;
	page?: string;
	type?: string;
}>;

export default async function AdminDashboard({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const { filter, query, page, type } = (await searchParams) || {};

	const users = await prisma.user.findMany({
		take: 10,
		orderBy: {
			createdAt: "desc",
		},
	});

	const companies = await prisma.company.findMany({
		take: 10,
		orderBy: {
			createdAt: "desc",
		},
	});

	const jobs = await prisma.job.findMany({
		take: 10,
		include: {
			categoryJob: true,
			company: true,
			_count: true,
		},
		orderBy: {
			createdAt: "desc",
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
		<Container>
			<h1 className="mb-8 font-bold text-3xl">Panel de Administración</h1>
			<AdminSummary
				usersTotal={usersTotal}
				companiesTotal={companiesTotal}
				jobsTotal={jobsTotal}
				applicationsTotal={applicationsTotal}
			/>
			<AdminChart data={data} />
			<div className="space-y-8">
				<UserAdminTable users={users} />

				<CompanyAdminTable companies={companies} />

				<JobAdminTable jobs={jobs} />
			</div>
		</Container>
	);
}
