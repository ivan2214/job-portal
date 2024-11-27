import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface JobStats {
	views: number;
	applications: number;
}

export default function JobStatistics({ job }: { job: JobStats }) {
	return (
		<Card className="mb-8">
			<CardHeader>
				<CardTitle>Job Statistics</CardTitle>
			</CardHeader>
			<CardContent>
				<dl className="grid grid-cols-2 gap-4">
					<div>
						<dt className="font-medium text-gray-500">Total Views</dt>
						<dd className="font-semibold text-2xl">{job.views}</dd>
					</div>
					<div>
						<dt className="font-medium text-gray-500">Total Applications</dt>
						<dd className="font-semibold text-2xl">{job.applications}</dd>
					</div>
				</dl>
			</CardContent>
		</Card>
	);
}
