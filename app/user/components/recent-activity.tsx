import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ApplicationWithRelations } from "@/types";
import Link from "next/link";

interface RecentActivityProps {
	applications: ApplicationWithRelations[];
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
								<p className="font-medium">{app.job?.title}</p>
								<p className="text-gray-500 text-sm">
									Applied on {app.dateApplied.toLocaleDateString()}
								</p>
							</div>
							<div className="flex items-center space-x-2">
								<Badge
									variant={
										app.status === "ACCEPTED"
											? "success"
											: app.status === "PENDING"
												? "pending"
												: app.status === "REJECTED"
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
