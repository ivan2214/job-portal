import { BreadcrumbDynamic } from "@/components/breadcrumbs-dynamic";
import { SearchBarAdminJob } from "./searchbar-admin-job";

export function JobsHeader() {
	return (
		<>
			<h1 className="mb-5 font-bold text-2xl">Manage Job Postings</h1>
			<BreadcrumbDynamic
				items={[
					{ label: "Admin", href: "/admin" },
					{ label: "Jobs", href: "/admin/jobs" },
				]}
			/>

			<div className="my-4">
				<SearchBarAdminJob />
			</div>
		</>
	);
}
