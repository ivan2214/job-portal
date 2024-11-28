import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Application, Company, Job } from "@prisma/client";
import WithdrawApplicationButton from "./withdraw-application-button";

export default async function JobApplicationDetails({
	application,
}: {
	application: Application & {
		job: Job & {
			company: Company;
		};
	};
}) {
	return (
		<Card className="mx-auto max-w-3xl">
			<CardHeader>
				<CardTitle className="font-bold text-2xl">
					{application.job.title}
				</CardTitle>
				<p className="text-muted-foreground">{application.job.company.name}</p>
			</CardHeader>
			<CardContent className="space-y-6">
				<div>
					<h2 className="mb-2 font-semibold text-xl">Application Status</h2>
					<Badge
						variant={application.status === "PENDING" ? "default" : "secondary"}
						className="text-lg"
					>
						{application.status}
					</Badge>
				</div>

				<div>
					<h3 className="mb-2 font-semibold text-lg">Status History</h3>
					{/* 	<ul className="space-y-2">
						{application.statusHistory.map((item) => (
							<li key={item.date} className="flex items-center justify-between">
								<span>{item.status}</span>
								<span className="text-muted-foreground">{item.date}</span>
							</li>
						))}
					</ul> */}
				</div>

				{/* 	{application.employerFeedback && (
					<div>
						<h3 className="mb-2 font-semibold text-lg">Employer Feedback</h3>
						<p className="rounded-md bg-muted p-4">
							{application.employerFeedback}
						</p>
					</div>
				)} */}

				{application.status === "PENDING" && (
					<WithdrawApplicationButton /* id={id} */ />
				)}
			</CardContent>
		</Card>
	);
}
