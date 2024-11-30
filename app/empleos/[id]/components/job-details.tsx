import { Building, DollarSign, Mail, MapPin, Phone } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { JobWithRelations } from "@/types";

export default function JobDetails({ job }: { job: JobWithRelations }) {
	return (
		<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
			<div className="col-span-1 space-y-8 md:col-span-2">
				<Card>
					<CardHeader>
						<CardTitle>Descripción del puesto</CardTitle>
					</CardHeader>
					<CardContent>
						<p>{job.description}</p>
					</CardContent>
				</Card>

				{job?.requirements && (
					<Card>
						<CardHeader>
							<CardTitle>Requisitos</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="list-disc space-y-2 pl-5">
								{job?.requirements?.map((req) => (
									<li key={req.id}>{req.name}</li>
								))}
							</ul>
						</CardContent>
					</Card>
				)}

				<Card>
					<CardHeader>
						<CardTitle>Detalles adicionales</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center gap-2">
							<DollarSign className="text-muted-foreground" />
							<span>{job.salary}</span>
						</div>
						<div className="flex items-center gap-2">
							<MapPin className="text-muted-foreground" />
							<span>{job.location}</span>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Sobre la empresa</CardTitle>
					</CardHeader>
					<CardContent className="flex items-start gap-4">
						<Avatar className="h-16 w-16">
							<AvatarImage
								src={job.company?.logo || ""}
								alt={job.company?.name}
							/>
							<AvatarFallback>{job.company?.name[0]}</AvatarFallback>
						</Avatar>
						<div>
							<h3 className="mb-2 font-semibold">{job.company?.name}</h3>
							<p>{job.company?.description}</p>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="col-span-1">
				<Card>
					<CardHeader>
						<CardTitle>Información de contacto</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center gap-2">
							<Building className="text-muted-foreground" />
							<span>{job.contactInfo?.website}</span>
						</div>
						<div className="flex items-center gap-2">
							<Mail className="text-muted-foreground" />
							<a
								href={`mailto:${job.contactInfo?.email}`}
								className="text-primary hover:underline"
							>
								{job.contactInfo?.email}
							</a>
						</div>
						<div className="flex items-center gap-2">
							<Phone className="text-muted-foreground" />
							<a
								href={`tel:${job.contactInfo?.phone}`}
								className="text-primary hover:underline"
							>
								{job.contactInfo?.phone}
							</a>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
