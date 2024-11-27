import {} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { ArrowRight } from "lucide-react";
import { JobCard } from "./job-card";
import { Container } from "./container";
import { prisma } from "@/db";

type FeaturedJobsProps = {};

export const FeaturedJobs: React.FC<FeaturedJobsProps> = async ({}) => {
	const jobsFeatured = await prisma.job.findMany({
		where: {
			isFeatured: true,
		},
		include: {
			company: true,
			categoryJob: true,
		},
	});
	return (
		<section className="py-12">
			<Container>
				<h2 className="mb-6 text-center font-semibold text-2xl">
					Empleos Destacados
				</h2>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{jobsFeatured.length > 0 &&
						jobsFeatured?.map((job) => <JobCard key={job.title} job={job} />)}
				</div>
				<div className="mt-8 text-center">
					<Button variant="outline">
						Ver Todos los Empleos <ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</div>
			</Container>
		</section>
	);
};
