import { Container } from "@/components/container";
import { prisma } from "@/db";
import { CallToAction } from "./components/call-to-action";
import { RecentActivity } from "./components/recent-activity";
import { SummaryCard } from "./components/summary-card";

async function getUserData(id: string) {
	const user = await prisma.user.findUnique({
		where: {
			id,
		},
		include: {
			applications: {
				include: {
					job: true,
				},
			},
		},
	});

	if (!user) {
		throw new Error("User not found");
	}

	const totalJobsApplied = user.applications.length;

	const acceptedApplications = user.applications.filter(
		(application) => application.status === "ACCEPTED",
	).length;

	const activeApplications = user.applications.filter(
		(application) => application.status === "PENDING",
	).length;

	const pendingApplications = user.applications.filter(
		(application) => application.status === "PENDING",
	).length;

	const rejectedApplications = user.applications.filter(
		(application) => application.status === "REJECTED",
	).length;

	const reviewedApplications = user.applications.filter(
		(application) => application.status === "REVIEWED",
	).length;

	const recentApplications = user.applications
		.slice(0, 5)
		.map((application) => ({
			id: application.id,
			jobTitle: application.job.title,
			status: application.status,
			dateApplied: application.createdAt.toDateString(),
		}));

	return {
		name: user.name,
		totalJobsApplied,
		activeApplications,
		acceptedApplications,
		recentApplications,
		rejectedApplications,
		reviewedApplications,
		pendingApplications,
	};
}

export default async function UserDashboard() {
	const userData = await getUserData("cm403g4mo002913hkwhfdey7e");

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
				<SummaryCard
					title="Rejected Applications"
					value={userData.rejectedApplications}
				/>
				<SummaryCard
					title="Reviewed Applications"
					value={userData.reviewedApplications}
				/>
				<SummaryCard
					title="Pending Applications"
					value={userData.pendingApplications}
				/>
			</div>
			<RecentActivity applications={userData.recentApplications} />
			<CallToAction />
		</Container>
	);
}
