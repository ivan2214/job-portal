import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import { Employers } from "./components/employers";

export default function EmployersPage() {
	return (
		<div className="container mx-auto p-6">
			<h1 className="mb-6 font-bold text-3xl text-gray-800">Employers</h1>
			<Breadcrumb>
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
			<Employers />
		</div>
	);
}
