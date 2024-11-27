import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { CategoryJob, Company, Job } from "@prisma/client";

import { Briefcase, DollarSign, MapPin } from "lucide-react";

export interface JobCardProps {
	job: Job & {
		company: Company | null;
		categoryJob: CategoryJob | null;
	};
}

export function JobCard({ job }: JobCardProps) {
	const { title, company, location, type, salary, description, categoryJob } =
		job;

	console.log("Category Job:", categoryJob);

	return (
		<Card key={title}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<p className="text-muted-foreground text-sm">{company?.name}</p>
			</CardHeader>
			<CardContent>
				<p className=" text-balance text-muted-foreground text-sm">
					{description}
				</p>
				<div className="mt-4 flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
					<span className="flex items-center">
						<MapPin size={16} className="mr-1" /> {location}
					</span>
					<span className="flex items-center">
						<Briefcase size={16} className="mr-1" /> {type}
					</span>
					<span className="flex items-center">
						<Briefcase size={16} className="mr-1" /> {categoryJob?.name}
					</span>
				</div>
				<div className="mt-4 flex items-center space-x-4 text-muted-foreground text-sm">
					<span className="flex items-center">
						<DollarSign size={16} className="mr-1" /> {salary}
					</span>
				</div>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Badge variant="secondary">{type}</Badge>
				<Button size="sm" variant="outline">
					Ver Detalles
				</Button>
			</CardFooter>
		</Card>
	);
}
