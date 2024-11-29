import { Container } from "@/components/container";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { prisma } from "@/db";
import { ChevronRight } from "lucide-react";
import { Employers } from "./components/employers";

export default async function EmployersPage() {
	const employers = await prisma.user.findMany({
		where: {
			role: "EMPLOYER",
		},
		include: {
			company: true,
			postedJobs: true,
		},
	});
	return (
		<Container>
			<h1 className="mb-6 font-bold text-3xl text-gray-800">Employers</h1>
			<Breadcrumb className="mb-6">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<ChevronRight className="h-4 w-4" />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbLink href="/admin/employers">Employers</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<Employers employers={employers} />
		</Container>
	);
}
