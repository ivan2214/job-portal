import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CategoriasDemandasChart } from "./components/categorias-demandadas-chart";
import { SalariosPromedioChart } from "./components/salarios-promedio-chart";
import { EmpleosPorTipoChart } from "./components/empleos-por-tipo-chart";
import { TablaResumen } from "./components/tabla-resumen";

export default function MercadoLaboral() {
	return (
		<div className="container mx-auto py-10">
			<h1 className="mb-4 font-bold text-4xl">Mercado Laboral en Lules</h1>
			<p className="mb-8 text-xl">
				Análisis de tendencias y estadísticas del mercado laboral en Lules,
				Tucumán.
			</p>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Categorías más demandadas</CardTitle>
						<CardDescription>
							Top 5 categorías de empleo en los últimos 3 meses
						</CardDescription>
					</CardHeader>
					<CardContent>
						<CategoriasDemandasChart />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Tendencia de salarios promedio</CardTitle>
						<CardDescription>
							Evolución de los salarios en los últimos 6 meses
						</CardDescription>
					</CardHeader>
					<CardContent>
						<SalariosPromedioChart />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Distribución de empleos por tipo</CardTitle>
						<CardDescription>
							Porcentaje de empleos según su modalidad
						</CardDescription>
					</CardHeader>
					<CardContent>
						<EmpleosPorTipoChart />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Resumen del mercado laboral</CardTitle>
						<CardDescription>
							Datos clave sobre el empleo en Lules
						</CardDescription>
					</CardHeader>
					<CardContent>
						<TablaResumen />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
