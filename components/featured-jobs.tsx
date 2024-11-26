import {} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { ArrowRight } from "lucide-react";
import { JobCard } from "./job-card";

type FeaturedJobsProps = {};

export const FeaturedJobs: React.FC<FeaturedJobsProps> = ({}) => {
	return (
		<section className="py-12">
			<div className="container mx-auto px-4">
				<h2 className="mb-6 text-center font-semibold text-2xl">
					Empleos Destacados
				</h2>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{[
						{
							title: "Desarrollador Web",
							company: "TechLules",
							location: "Lules, Tucumán",
							type: "Tiempo completo",
							description:
								"Empresa de tecnología busca desarrollador web con experiencia en React y Node.js.",
							salary: "$80,000 - $120,000 al año",
						},
						{
							title: "Asistente Administrativo",
							company: "Oficina Central",
							location: "San Miguel de Tucumán",
							type: "Medio tiempo",
							description:
								"Se busca asistente administrativo para importante empresa de la zona.",
							salary: "$40,000 - $60,000 al año",
						},
						{
							title: "Profesor de Inglés",
							company: "Instituto de Idiomas",
							location: "Lules, Tucumán",
							type: "Por horas",
							description:
								"Instituto de idiomas busca profesor de inglés con experiencia para clases grupales.",
							salary: "$20,000 - $30,000 al año",
						},
					].map((job) => (
						<JobCard
							key={job.title}
							company={job.company}
							description={job.description}
							location={job.location}
							title={job.title}
							type={job.type}
							salary={job.salary}
						/>
					))}
				</div>
				<div className="mt-8 text-center">
					<Button variant="outline">
						Ver Todos los Empleos <ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</div>
			</div>
		</section>
	);
};
