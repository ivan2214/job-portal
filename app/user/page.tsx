import { SummaryCard } from "./components/summary-card";
import { RecentActivity } from "./components/recent-activity";
import { CallToAction } from "./components/call-to-action";
import { Container } from "@/components/container";

async function getUserData() {
	// This is a mock function. In a real application, you would fetch this data from your API
	return {
		name: "John Doe",
		totalJobsApplied: 15,
		activeApplications: 7,
		acceptedApplications: 3,
		recentApplications: [
			{
				id: 1,
				jobTitle: "Software Engineer",
				status: "Pending",
				dateApplied: "2023-06-01",
			},
			{
				id: 2,
				jobTitle: "Product Manager",
				status: "Accepted",
				dateApplied: "2023-05-28",
			},
			{
				id: 3,
				jobTitle: "UX Designer",
				status: "Rejected",
				dateApplied: "2023-05-25",
			},
		],
	};
}

export default async function UserDashboard() {
	const userData = await getUserData();

	return (
		<Container className="space-y-6">
			<h1 className="font-bold text-3xl">Welcome back, {userData.name}!</h1>
			<div className="grid gap-6 md:grid-cols-3">
				<SummaryCard
					title="Total Jobs Applied"
					value={userData.totalJobsApplied}
				/>
				<SummaryCard
					title="Active Applications"
					value={userData.activeApplications}
				/>
				<SummaryCard
					title="Accepted Applications"
					value={userData.acceptedApplications}
				/>
			</div>
			<RecentActivity applications={userData.recentApplications} />
			<CallToAction />
		</Container>
	);
}
