import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { JobWithRelations } from "@/types";
import Link from "next/link";

interface JobCardProps {
	job: JobWithRelations;
	onWithdraw?: (id: string) => void;
}

export function JobCardApplied({ job, onWithdraw }: JobCardProps) {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="flex items-center justify-between">
					<span>{job.title}</span>
					<Badge
						variant={
							job.applicationStatus === "PENDING"
								? "pending"
								: job.applicationStatus === "ACCEPTED"
									? "success"
									: job.applicationStatus === "REJECTED"
										? "destructive"
										: "default"
						}
					>
						{job.applicationStatus}
					</Badge>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-gray-600 text-sm">{job.Company?.name}</p>
				<p className="text-gray-600 text-sm">{job.location}</p>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button asChild>
					<Link href={`/user/jobs/${job.id}`}>View Details</Link>
				</Button>
				<Button
					variant="outline"
					onClick={() => {
						if (onWithdraw) {
							onWithdraw(job.id);
						}
					}}
				>
					Withdraw Application
				</Button>
			</CardFooter>
		</Card>
	);
}
