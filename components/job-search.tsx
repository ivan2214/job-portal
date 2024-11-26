import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface JobSearchProps {
  
}

export const JobSearch: React.FC <JobSearchProps> = ({  }) => {
  return (
    <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-6 text-center">Buscar Empleos</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Input className="w-full md:w-64" placeholder="Título o palabras clave" />
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
