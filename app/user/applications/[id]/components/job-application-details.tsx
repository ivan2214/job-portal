import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import WithdrawApplicationButton from "./withdraw-application-button";
import { mockJobApplication } from "../data/mock-data";

export default async function JobApplicationDetails({ id }: { id: string }) {
	const jobApplication = mockJobApplication;

	console.log("Job Application ID:", id);

	return (
		<Card className="mx-auto max-w-3xl">
			<CardHeader>
				<CardTitle className="font-bold text-2xl">
					{jobApplication.jobTitle}
				</CardTitle>
				<p className="text-muted-foreground">{jobApplication.companyName}</p>
			</CardHeader>
			<CardContent className="space-y-6">
				<div>
					<h2 className="mb-2 font-semibold text-xl">Application Status</h2>
					<Badge
						variant={jobApplication.isPending ? "default" : "secondary"}
						className="text-lg"
					>
						{jobApplication.status}
					</Badge>
				</div>

				<div>
					<h3 className="mb-2 font-semibold text-lg">Status History</h3>
					<ul className="space-y-2">
						{jobApplication.statusHistory.map((item) => (
							<li key={item.date} className="flex items-center justify-between">
								<span>{item.status}</span>
								<span className="text-muted-foreground">{item.date}</span>
							</li>
						))}
					</ul>
				</div>

				{jobApplication.employerFeedback && (
					<div>
						<h3 className="mb-2 font-semibold text-lg">Employer Feedback</h3>
						<p className="rounded-md bg-muted p-4">
							{jobApplication.employerFeedback}
						</p>
					</div>
				)}

				{jobApplication.isPending && (
					<WithdrawApplicationButton /* id={id} */ />
				)}
			</CardContent>
		</Card>
	);
}
