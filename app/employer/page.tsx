import { Container } from "@/components/container";
import { CallToAction } from "./components/call-to-action";
import { DashboardSummary } from "./components/dashboard-summary";
import { RecentActivity } from "./components/recent-activity";

// Dummy data for demonstration
const companyName = "Acme Inc.";
const dashboardData = {
	totalJobs: 15,
	activeJobs: 8,
	totalApplications: 127,
};
const recentJobs = [
	{
		id: 1,
		title: "Senior Software Engineer",
		status: "open",
		applications: 12,
	},
	{ id: 2, title: "Product Manager", status: "closed", applications: 24 },
	{ id: 3, title: "UX Designer", status: "open", applications: 8 },
	{ id: 4, title: "Data Analyst", status: "open", applications: 15 },
];

export default function EmployerDashboard() {
	return (
		<Container className="space-y-8">
			<h1 className="font-bold text-3xl">Welcome, {companyName}!</h1>
			<DashboardSummary data={dashboardData} />
			<RecentActivity jobs={recentJobs} />
			<CallToAction />
		</Container>
	);
}
