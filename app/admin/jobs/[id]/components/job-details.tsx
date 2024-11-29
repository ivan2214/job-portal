import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Users, DollarSign } from "lucide-react";
import type { JobWithRelations } from "@/types";

interface JobDetailsProps {
	job: JobWithRelations;
}

export function JobDetails({ job }: JobDetailsProps) {
	return (
		<div className="space-y-6">
			<div className="flex items-center space-x-4">
				<Image
					src={job.Company?.logo || "http://picsum.photos/200/200?random"}
					alt={`${job.Company?.name} logo`}
					width={50}
					height={50}
					className="rounded-lg"
				/>
				<div>
					<Link
						href={`/admin/companies/${job.Company?.userId}`}
						className="font-medium hover:underline"
					>
						{job.Company?.name}
					</Link>
					<p className="text-muted-foreground text-sm">Company Profile</p>
				</div>
			</div>

			<div className="space-y-4">
				<div className="grid gap-3 text-sm">
					<div className="flex items-center gap-2">
						<MapPin className="h-4 w-4 text-muted-foreground" />
						<span>{job.location}</span>
					</div>
					<div className="flex items-center gap-2">
						<DollarSign className="h-4 w-4 text-muted-foreground" />
						<span>{job.salary}</span>
					</div>
					<div className="flex items-center gap-2">
						<Calendar className="h-4 w-4 text-muted-foreground" />
						<span>
							Posted on {new Date(job.createdAt).toLocaleDateString()}
						</span>
					</div>
					<div className="flex items-center gap-2">
						<Users className="h-4 w-4 text-muted-foreground" />
						<span>{job.applications?.length} Applications</span>
					</div>
				</div>

				<div className="space-y-2">
					<h3 className="font-medium">Job Description</h3>
					<p className="whitespace-pre-wrap text-muted-foreground text-sm">
						{job.description}
					</p>
				</div>
			</div>
		</div>
	);
}
