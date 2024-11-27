import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Application {
	id: string;
	jobTitle: string;
	status: string;
	dateApplied: string;
}

interface RecentActivityProps {
	applications: Application[];
}

export function RecentActivity({ applications }: RecentActivityProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Recent Activity</CardTitle>
			</CardHeader>
			<CardContent>
				<ul className="space-y-4">
					{applications.map((app) => (
						<li key={app.id} className="flex items-center justify-between">
							<div>
								<p className="font-medium">{app.jobTitle}</p>
								<p className="text-gray-500 text-sm">
									Applied on {app.dateApplied}
								</p>
							</div>
							<div className="flex items-center space-x-2">
								<Badge
									variant={
										app.status === "Accepted"
											? "success"
											: app.status === "Rejected"
												? "destructive"
												: "default"
									}
								>
									{app.status}
								</Badge>
								<Link
									href={`/user/applications/${app.id}`}
									className="text-blue-600 text-sm hover:underline"
								>
									View Details
								</Link>
							</div>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
}
