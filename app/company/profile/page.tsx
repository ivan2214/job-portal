import { Container } from "@/components/container";
import { prisma } from "@/db";
import { notFound } from "next/navigation";
import CompanyProfile from "./components/company-profile";
import JobList from "./components/job-list";
import NewJobForm from "./components/new-job-form";
import { auth } from "@/auth";

export default async function CompanyProfilePage() {
	const session = await auth();
	const companyId = session?.user?.id;

	if (!companyId) {
		return notFound();
	}

	const company = await prisma.company.findUnique({
		where: {
			userId: companyId,
		},
		include: {
			jobPostings: true,
		},
	});

	if (!company) {
		return notFound();
	}

	return (
		<Container>
			<h1 className="mb-8 font-bold text-3xl">Perfil de Empleador</h1>
			<div className="grid gap-8">
				<CompanyProfile company={company} />
				<JobList jobs={company.jobPostings} />
				<NewJobForm />
			</div>
		</Container>
	);
}
