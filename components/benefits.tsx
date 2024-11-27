import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	BarChart,
	Briefcase,
	Building,
	ClipboardList,
	FileText,
	MapPin,
	Search,
	Users,
} from "lucide-react";
import { Container } from "./container";

export default function Benefits() {
	return (
		<Container>
			<h1 className="mb-12 text-center font-bold text-4xl">
				Ventajas de Nuestra Plataforma
			</h1>

			<div className="grid gap-8 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="text-center font-bold text-2xl">
							Para Postulantes
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="space-y-4">
							<BeneficioItem
								icon={<MapPin />}
								texto="Acceso a empleos locales"
							/>
							<BeneficioItem
								icon={<FileText />}
								texto="Creación y gestión de CV"
							/>
							<BeneficioItem
								icon={<Search />}
								texto="Búsqueda personalizada de empleos"
							/>
							<BeneficioItem
								icon={<Briefcase />}
								texto="Seguimiento de postulaciones"
							/>
						</ul>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-center font-bold text-2xl">
							Para Empleadores
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="space-y-4">
							<BeneficioItem icon={<Users />} texto="Alcance a talento local" />
							<BeneficioItem
								icon={<Building />}
								texto="Perfil de empresa personalizado"
							/>
							<BeneficioItem
								icon={<ClipboardList />}
								texto="Gestión eficiente de postulaciones"
							/>
							<BeneficioItem
								icon={<BarChart />}
								texto="Análisis de candidatos"
							/>
						</ul>
					</CardContent>
				</Card>
			</div>
		</Container>
	);
}

function BeneficioItem({
	icon,
	texto,
}: { icon: React.ReactNode; texto: string }) {
	return (
		<li className="flex items-center space-x-3">
			<div className="rounded-full bg-primary p-2 text-primary-foreground">
				{icon}
			</div>
			<span>{texto}</span>
		</li>
	);
}
