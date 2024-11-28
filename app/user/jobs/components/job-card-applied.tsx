import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import type { Job } from "../data/mock-jobs";

interface JobCardProps {
	job: Job;
	onWithdraw: (id: string) => void;
}

export function JobCardApplied({ job, onWithdraw }: JobCardProps) {
	const statusColor = {
		Pending: "bg-yellow-200 text-yellow-800",
		Accepted: "bg-green-200 text-green-800",
		Rejected: "bg-red-200 text-red-800",
	}[job.status];

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="flex items-center justify-between">
					<span>{job.title}</span>
					<Badge className={statusColor}>{job.status}</Badge>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-gray-600 text-sm">{job.company}</p>
				<p className="text-gray-600 text-sm">{job.location}</p>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button asChild>
					<Link href={`/user/jobs/${job.id}`}>View Details</Link>
				</Button>
				<Button variant="outline" onClick={() => onWithdraw(job.id)}>
					Withdraw Application
				</Button>
			</CardFooter>
		</Card>
	);
}
