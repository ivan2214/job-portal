import type { Job } from "@/app/user/jobs/[id]/types/job";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { CategoryJob, Company } from "@prisma/client";
import { DollarSign, MapPin } from "lucide-react";
import Link from "next/link";

interface JobPostingProps {
	job: Job & {
		company: Company;
		categoryJob: CategoryJob;
	};
}

export function JobPosting({ job }: JobPostingProps) {
	return (
		<Card>
			<CardContent className="pt-6">
				<Link
					href={`/empleos/${job.id}`}
					className="font-semibold text-blue-600 text-xl hover:underline"
				>
					{job.title}
				</Link>
				<p className="mt-2 text-gray-600">{job.description}</p>
				<div className="mt-4 flex items-center text-gray-500 text-sm">
					<MapPin className="mr-1 h-4 w-4" />
					<span>{job.location}</span>
					{job.salary && (
						<>
							<DollarSign className="mr-1 ml-4 h-4 w-4" />
							<span>{job.salary}</span>
						</>
					)}
				</div>
			</CardContent>
			<CardFooter>
				{/* <AuthCheck
					fallback={
						<p className="text-gray-500 text-sm">
							<Link href="/login" className="text-blue-600 hover:underline">
								Sign in
							</Link>{" "}
							or{" "}
							<Link href="/register" className="text-blue-600 hover:underline">
								create an account
							</Link>{" "}
							to apply
						</p>
					}
				>
					<Button asChild>
						<Link href={`/user/jobs/${job.id}/apply`}>Apply Now</Link>
					</Button>
				</AuthCheck> */}
			</CardFooter>
		</Card>
	);
}
