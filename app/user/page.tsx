import { Container } from "@/components/container";
import { prisma } from "@/db";
import { notFound } from "next/navigation";
import { CallToAction } from "./components/call-to-action";
import { RecentActivity } from "./components/recent-activity";
import { SummaryCard } from "./components/summary-card";
import { auth } from "@/auth";

export default async function UserDashboard() {
	const session = await auth();
	const userId = session?.user?.id;
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
			AND: {
				role: "USER",
			},
		},
	});

	if (!user) {
		return notFound();
	}

	const activeApplications = await prisma.application.count({
		where: {
			user: {
				id: userId,
			},
			AND: {
				status: {
					not: "REJECTED",
				},
			},
		},
	});

	const acceptedApplications = await prisma.application.count({
		where: {
			user: {
				id: userId,
			},
			status: "ACCEPTED",
		},
	});

	const rejectedApplications = await prisma.application.count({
		where: {
			user: {
				id: userId,
			},
			status: "REJECTED",
		},
	});

	const reviewedApplications = await prisma.application.count({
		where: {
			user: {
				id: userId,
			},
			status: "REVIEWED",
		},
	});

	const pendingApplications = await prisma.application.count({
		where: {
			user: {
				id: userId,
			},
			status: "PENDING",
		},
	});

	const recentApplications = await prisma.application.findMany({
		where: {
			user: {
				id: userId,
			},
		},
		orderBy: {
			createdAt: "desc",
		},
		take: 5,
		include: {
			job: true,
			user: true,
		},
	});

	const totalJobsApplied = await prisma.application.count({
		where: {
			user: {
				id: userId,
			},
		},
	});

	return (
		<Container className="space-y-6">
			<h1 className="font-bold text-3xl">Welcome back, {user.name}!</h1>
			<div className="grid gap-6 md:grid-cols-3">
				<SummaryCard title="Total Jobs Applied" value={totalJobsApplied} />
				<SummaryCard title="Active Applications" value={activeApplications} />
				<SummaryCard
					title="Accepted Applications"
					value={acceptedApplications}
				/>
				<SummaryCard
					title="Rejected Applications"
					value={rejectedApplications}
				/>
				<SummaryCard
					title="Reviewed Applications"
					value={reviewedApplications}
				/>
				<SummaryCard title="Pending Applications" value={pendingApplications} />
			</div>
			<RecentActivity applications={recentApplications} />
			<CallToAction />
		</Container>
	);
}
