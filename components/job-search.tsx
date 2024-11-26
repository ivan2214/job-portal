import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type JobSearchProps = {};

export const JobSearch: React.FC<JobSearchProps> = ({}) => {
	return (
		<section className="bg-gray-50 py-12">
			<div className="container mx-auto px-4">
				<h2 className="mb-6 text-center font-semibold text-2xl">
					Buscar Empleos
				</h2>
				<div className="flex flex-wrap justify-center gap-4">
					<Input
						className="w-full md:w-64"
						placeholder="Título o palabras clave"
					/>
					{/*  <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
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
                <SelectContent>
                  <SelectItem value="lules">Lules</SelectItem>
                  <SelectItem value="tucuman">San Miguel de Tucumán</SelectItem>
                  <SelectItem value="yerba-buena">Yerba Buena</SelectItem>
                  <SelectItem value="tafi-viejo">Tafí Viejo</SelectItem>
                </SelectContent>
              </Select> */}
					<Button className="w-full md:w-auto">Buscar</Button>
				</div>
			</div>
		</section>
	);
};
