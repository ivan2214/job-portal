import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Briefcase,
	FileText,
	MapPin,
	Search,
	Users,
	Building,
	ClipboardList,
	BarChart,
} from "lucide-react";

export default function Benefits() {
	return (
		<div className="container mx-auto px-4 py-12">
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
		</div>
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
