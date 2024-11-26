import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Briefcase, DollarSign, MapPin } from "lucide-react";

export interface JobCardProps {
	title: string;
	company: string;
	location: string;
	salary: string;
	description: string;
	type: string;
}

export function JobCard({
	title,
	company,
	location,
	salary,
	description,
	type,
}: JobCardProps) {
	return (
		<Card key={title}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<p className="text-muted-foreground text-sm">{company}</p>
			</CardHeader>
			<CardContent>
				<p className=" text-balance text-muted-foreground text-sm">
					{description}
				</p>
				<div className="mt-4 flex items-center space-x-4 text-muted-foreground text-sm">
					<span className="flex items-center">
						<MapPin size={16} className="mr-1" /> {location}
					</span>
					<span className="flex items-center">
						<Briefcase size={16} className="mr-1" /> {type}
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
