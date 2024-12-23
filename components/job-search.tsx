import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Container } from "./container";
import { SearchJobInput } from "./search-job-input";

type JobSearchProps = {};

export const JobSearch: React.FC<JobSearchProps> = ({}) => {
	return (
		<section className="bg-gray-50 py-12">
			<Container className="px-4 py-0">
				<h2 className="mb-6 text-center font-semibold text-2xl">
					Buscar Empleos
				</h2>
				<div className="flex flex-wrap justify-center gap-4">
					<SearchJobInput />
					<Select>
						<SelectTrigger className="w-full md:w-48">
							<SelectValue placeholder="Todos" />
						</SelectTrigger>
						<SelectContent defaultValue="todos">
							<SelectItem value="todos">Todos</SelectItem>
							<SelectItem value="tecnologia">Tecnología</SelectItem>
							<SelectItem value="ventas">Ventas</SelectItem>
							<SelectItem value="administracion">Administración</SelectItem>
							<SelectItem value="educacion">Educación</SelectItem>
							<SelectItem value="salud">Salud</SelectItem>
						</SelectContent>
					</Select>
					<Select>
						<SelectTrigger className="w-full md:w-48">
							<SelectValue placeholder="Ubicación" />
						</SelectTrigger>
						<SelectContent defaultValue="ubicacion">
							<SelectItem value="ubicacion">Ubicación</SelectItem>
							<SelectItem value="lules">Lules</SelectItem>
							<SelectItem value="tucuman">San Miguel de Tucumán</SelectItem>
							<SelectItem value="yerba-buena">Yerba Buena</SelectItem>
							<SelectItem value="tafi-viejo">Tafí Viejo</SelectItem>
						</SelectContent>
					</Select>
					<Button className="w-full md:w-auto">Buscar</Button>
				</div>
			</Container>
		</section>
	);
};
