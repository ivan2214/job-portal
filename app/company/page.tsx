import { Container } from "@/components/container";
import { prisma } from "@/db";
import { notFound } from "next/navigation";
import { CallToAction } from "./components/call-to-action";
import { DashboardSummary } from "./components/dashboard-summary";
import { RecentActivity } from "./components/recent-activity";

export default async function CompanyDashboard() {
	const companyId = "cm43ejos60009uct4ed84fa79";
	const company = await prisma.company.findUnique({
		where: {
			userId: companyId,
		},
		include: {
			jobPostings: {
				include: {
					applications: true,
				},
			},
		},
	});

	if (!company) {
		return notFound();
	}

	const totalJobs = company.jobPostings.length;
	const activeJobs = company.jobPostings.filter(
		(job) => job.applicationStatus !== "REJECTED",
	).length;
	const totalApplications = company.jobPostings.reduce(
		(total, job) => total + job.applications.length,
		0,
	);

	const dashboardData = {
		totalJobs,
		activeJobs,
		totalApplications,
	};

	return (
		<Container className="space-y-8">
			<h1 className="font-bold text-3xl">Welcome, {company.name}!</h1>
			<DashboardSummary data={dashboardData} />
			<RecentActivity jobs={company?.jobPostings} />
			<CallToAction />
		</Container>
	);
}
