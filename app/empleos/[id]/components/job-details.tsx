import type { Job } from "@prisma/client";
import { CalendarIcon, DollarSign, MapPinIcon } from "lucide-react";

export default function JobDetails({ job }: { job: Job }) {
	return (
		<div className="rounded-lg bg-white p-6 shadow-md">
			<h2 className="mb-4 font-semibold text-2xl">Job Details</h2>
			<div className="space-y-4">
				<p>{job.description}</p>
				<div className="flex items-center">
					<DollarSign className="mr-2 h-5 w-5 text-gray-500" />
					<span>{job.salary}</span>
				</div>
				<div className="flex items-center">
					<MapPinIcon className="mr-2 h-5 w-5 text-gray-500" />
					<span>{job.location}</span>
				</div>
				<div className="flex items-center">
					<CalendarIcon className="mr-2 h-5 w-5 text-gray-500" />
					<span>Posted on {new Date(job.createdAt).toLocaleDateString()}</span>
				</div>
			</div>
		</div>
	);
}
