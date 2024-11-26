import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Briefcase, MapPin } from "lucide-react";

type Job = {
	title: string;
	company: string;
	location: string;
	type: string;
	description: string;
};

export default function JobCard({ job }: { job: Job }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{job.title}</CardTitle>
				<p className="text-muted-foreground text-sm">{job.company}</p>
			</CardHeader>
			<CardContent>
				<p>{job.description}</p>
				<div className="mt-4 flex items-center space-x-4 text-muted-foreground text-sm">
					<span className="flex items-center">
						<MapPin size={16} className="mr-1" /> {job.location}
					</span>
					<span className="flex items-center">
						<Briefcase size={16} className="mr-1" /> {job.type}
					</span>
				</div>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Badge variant="secondary">{job.type}</Badge>
				<Button variant="outline">Ver Detalles</Button>
			</CardFooter>
		</Card>
	);
}
