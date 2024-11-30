import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Job } from "@prisma/client";
import { Briefcase, Building2, MapPin } from "lucide-react";

interface JobCardProps {
	job: Job;
}

export function JobCard({ job }: JobCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Job Details</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div className="flex items-center space-x-2">
						<Briefcase className="h-5 w-5 text-muted-foreground" />
						<span>{job.title}</span>
					</div>
					<div className="flex items-center space-x-2">
						<Building2 className="h-5 w-5 text-muted-foreground" />
						<span>{job.salary}</span>
					</div>
					<div className="flex items-center space-x-2">
						<MapPin className="h-5 w-5 text-muted-foreground" />
						<span>{job.location}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
