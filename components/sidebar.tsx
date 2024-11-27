import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export function Sidebar() {
	return (
		<aside className="w-64 bg-gray-100 p-4">
			<h2 className="mb-4 font-semibold text-lg">Filtros</h2>
			<div className="space-y-4">
				<div>
					<Label htmlFor="category">Categoría</Label>
					<Select>
						<SelectTrigger id="category">
							<SelectValue placeholder="Seleccionar categoría" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="tech">Tecnología</SelectItem>
							<SelectItem value="marketing">Marketing</SelectItem>
							<SelectItem value="design">Diseño</SelectItem>
							<SelectItem value="sales">Ventas</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<Label htmlFor="salary">Salario</Label>
					<Slider
						id="salary"
						defaultValue={[50000]}
						max={200000}
						step={1000}
						className="mt-2"
					/>
					<div className="mt-1 flex justify-between text-gray-500 text-sm">
						<span>$0</span>
						<span>$200k+</span>
					</div>
				</div>
				<div>
					<Label htmlFor="location">Ubicación</Label>
					<Input id="location" placeholder="Ej. Madrid, España" />
				</div>
				<div>
					<Label htmlFor="job-type">Tipo de empleo</Label>
					<Select>
						<SelectTrigger id="job-type">
							<SelectValue placeholder="Seleccionar tipo" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="full-time">Tiempo completo</SelectItem>
							<SelectItem value="part-time">Medio tiempo</SelectItem>
							<SelectItem value="contract">Contrato</SelectItem>
							<SelectItem value="freelance">Freelance</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		</aside>
	);
}
