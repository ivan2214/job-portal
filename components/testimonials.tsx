import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface TestimonialsProps {
    
}

export const Testimonials: React.FC<TestimonialsProps> = ({  }) => {
    return (
        <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6 text-center">Lo que dicen nuestros usuarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "María González",
                role: "Desarrolladora Web",
                content: "Gracias a Lules Jobs encontré mi trabajo ideal en una startup local. El proceso fue rápido y sencillo."
              },
              {
                name: "Juan Pérez",
                role: "Gerente de Recursos Humanos",
                content: "Como empresa, hemos encontrado excelentes candidatos a través de esta plataforma. Es nuestra primera opción para publicar ofertas."
              },
              {
                name: "Laura Sánchez",
                role: "Profesora",
                content: "La variedad de ofertas en el sector educativo me sorprendió gratamente. Recomiendo Lules Jobs a todos mis colegas."
              }
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{testimonial.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </CardHeader>
                <CardContent>
                  <p>"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
};
