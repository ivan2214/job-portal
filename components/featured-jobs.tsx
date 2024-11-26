import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Badge } from "@/components/ui/badge"

import { ArrowRight, Briefcase, MapPin } from "lucide-react"



interface FeaturedJobsProps {
    
}

export const FeaturedJobs: React.FC<FeaturedJobsProps> = ({  }) => {
    return (
        <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6 text-center">Empleos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Desarrollador Web",
                company: "TechLules",
                location: "Lules, Tucumán",
                type: "Tiempo completo",
                description: "Empresa de tecnología busca desarrollador web con experiencia en React y Node.js."
              },
              {
                title: "Asistente Administrativo",
                company: "Oficina Central",
                location: "San Miguel de Tucumán",
                type: "Medio tiempo",
                description: "Se busca asistente administrativo para importante empresa de la zona."
              },
              {
                title: "Profesor de Inglés",
                company: "Instituto de Idiomas",
                location: "Lules, Tucumán",
                type: "Por horas",
                description: "Instituto de idiomas busca profesor de inglés con experiencia para clases grupales."
              }
            ].map((job, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </CardHeader>
                <CardContent>
                  <p>{job.description}</p>
                  <div className="flex items-center mt-4 space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center"><MapPin size={16} className="mr-1" /> {job.location}</span>
                    <span className="flex items-center"><Briefcase size={16} className="mr-1" /> {job.type}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="secondary">{job.type}</Badge>
                  <Button variant="outline">Ver Detalles</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline">Ver Todos los Empleos <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
        </div>
      </section>
    );
};
