import { Container } from "@/components/container";
import CompanyProfile from "./components/company-profile";
import JobList from "./components/job-list";
import NewJobForm from "./components/new-job-form";

export default function EmployerProfilePage() {
	return (
		<Container>
			<h1 className="mb-8 font-bold text-3xl">Perfil de Empleador</h1>
			<div className="grid gap-8">
				<CompanyProfile />
				<JobList />
				<NewJobForm />
			</div>
		</Container>
	);
}
