import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, DollarSign, Mail, MapPin, Phone } from "lucide-react";

export default function JobDetailPage() {
	// En una aplicación real, obtendríamos estos datos de una API o base de datos
	const job = {
		title: "Desarrollador Full Stack Senior",
		company: {
			name: "TechCorp Innovations",
			logo: "/placeholder.svg?height=100&width=100",
			description:
				"TechCorp Innovations es una empresa líder en desarrollo de software empresarial.",
		},
		description:
			"Estamos buscando un Desarrollador Full Stack Senior para unirse a nuestro equipo dinámico...",
		requirements: [
			"5+ años de experiencia en desarrollo web",
			"Profundo conocimiento de JavaScript, React, y Node.js",
			"Experiencia con bases de datos SQL y NoSQL",
			"Habilidades sólidas en arquitectura de software",
		],
		salary: "$80,000 - $120,000 al año",
		location: "Ciudad de México, México (Híbrido)",
		contactInfo: {
			name: "Ana García",
			email: "ana.garcia@techcorp.com",
			phone: "+52 55 1234 5678",
		},
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<header className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="mb-2 font-bold text-3xl">{job.title}</h1>
					<p className="text-muted-foreground text-xl">{job.company.name}</p>
				</div>
				<Button size="lg">Postularse</Button>
			</header>

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

					<Card>
						<CardHeader>
							<CardTitle>Requisitos</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="list-disc space-y-2 pl-5">
								{job.requirements.map((req) => (
									<li key={req}>{req}</li>
								))}
							</ul>
						</CardContent>
					</Card>

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
								<AvatarImage src={job.company.logo} alt={job.company.name} />
								<AvatarFallback>{job.company.name[0]}</AvatarFallback>
							</Avatar>
							<div>
								<h3 className="mb-2 font-semibold">{job.company.name}</h3>
								<p>{job.company.description}</p>
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
								<span>{job.contactInfo.name}</span>
							</div>
							<div className="flex items-center gap-2">
								<Mail className="text-muted-foreground" />
								<a
									href={`mailto:${job.contactInfo.email}`}
									className="text-primary hover:underline"
								>
									{job.contactInfo.email}
								</a>
							</div>
							<div className="flex items-center gap-2">
								<Phone className="text-muted-foreground" />
								<a
									href={`tel:${job.contactInfo.phone}`}
									className="text-primary hover:underline"
								>
									{job.contactInfo.phone}
								</a>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
