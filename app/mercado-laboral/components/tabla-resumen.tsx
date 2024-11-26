import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const data = [
	{ metrica: "Tasa de desempleo", valor: "5.2%" },
	{ metrica: "Empleos creados (último mes)", valor: "350" },
	{ metrica: "Salario mínimo", valor: "$45,000" },
	{ metrica: "Empresas contratando", valor: "78" },
];

export function TablaResumen() {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Métrica</TableHead>
					<TableHead>Valor</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((item) => (
					<TableRow key={item.metrica}>
						<TableCell>{item.metrica}</TableCell>
						<TableCell>{item.valor}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
