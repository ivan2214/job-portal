import { Container } from "@/components/container";
import {} from "@/components/ui/form";
import {} from "@/components/ui/select";
import { NewJobForm } from "./components/new-job-form";
import { prisma } from "@/db";

export default async function CrearOfertaPage() {
	const categoriesJobs = await prisma.categoryJob.findMany({});
	return (
		<Container>
			<h1 className="mb-6 font-bold text-3xl">Crear Nueva Oferta de Empleo</h1>
			<NewJobForm categoriesJobs={categoriesJobs} />
		</Container>
	);
}
