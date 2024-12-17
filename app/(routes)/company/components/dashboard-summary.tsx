import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardSummaryProps {
	data: {
		totalJobs: number;
		activeJobs: number;
		totalApplications: number;
	};
}

export function DashboardSummary({ data }: DashboardSummaryProps) {
	return (
		<div className="grid gap-4 md:grid-cols-3">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="font-medium text-sm">
						Total Job Postings
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="font-bold text-2xl">{data.totalJobs}</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="font-medium text-sm">
						Active Job Postings
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="font-bold text-2xl">{data.activeJobs}</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="font-medium text-sm">
						Total Applications
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="font-bold text-2xl">{data.totalApplications}</div>
				</CardContent>
			</Card>
		</div>
	);
}
