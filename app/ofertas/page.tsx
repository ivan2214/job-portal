import { Header } from "@/components/header";
import { JobCard, type JobCardProps } from "@/components/job-card";
import { Pagination } from "@/components/pagination";
import { Sidebar } from "@/components/sidebar";

const jobListings: JobCardProps[] = [
	{
		title: "Desarrollador Frontend",
		company: "TechCorp",
		location: "Madrid, España",
		salary: "€40,000 - €60,000",
		description:
			"Empresa de tecnología busca desarrollador frontend con experiencia en React y Node.js.",
		type: "Tiempo completo",
	},
	{
		title: "Diseñador UX/UI",
		company: "DesignHub",
		location: "Barcelona, España",
		salary: "€35,000 - €55,000",
		description:
			"Empresa de diseño busca diseñador UX/UI con experiencia en Figma y Adobe XD.",

		type: "Tiempo completo",
	},
	{
		title: "Ingeniero de Software Backend",
		company: "DataSystems",
		location: "Valencia, España",
		salary: "€45,000 - €70,000",
		type: "Tiempo completo",
		description:
			"Empresa de tecnología busca ingeniero de software backend con experiencia en Python y Node.js.",
	},
	{
		title: "Especialista en Marketing Digital",
		company: "GrowthMedia",
		location: "Sevilla, España",
		salary: "€30,000 - €50,000",
		type: "Tiempo completo",
		description:
			"Empresa de marketing busca especialista en marketing digital con experiencia en Google Analytics y Facebook Ads.",
	},
	{
		title: "Analista de Datos",
		company: "InsightAnalytics",
		location: "Bilbao, España",
		salary: "€40,000 - €65,000",
		type: "Tiempo completo",
		description:
			"Empresa de tecnología busca analista de datos con experiencia en SQL y Python.",
	},
	{
		title: "Gerente de Proyecto",
		company: "ProjectPro",
		location: "Málaga, España",
		salary: "€50,000 - €80,000",
		type: "Tiempo Parcial",
		description:
			"Empresa de desarrollo de software busca gerente de proyecto con experiencia en Python y Django.",
	},
];

export default function JobListings() {
	return (
		<div className="min-h-screen bg-gray-100">
			<Header />
			<main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
				<h1 className="mb-6 font-bold text-3xl">Ofertas de Empleo</h1>
				<div className="flex flex-col gap-8 md:flex-row">
					<Sidebar />
					<div className="flex-1">
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{jobListings.map((job) => (
								<JobCard key={job.title} {...job} />
							))}
						</div>
						<Pagination />
					</div>
				</div>
			</main>
		</div>
	);
}
