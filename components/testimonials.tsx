import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TestimonialsProps = {};

export const Testimonials: React.FC<TestimonialsProps> = ({}) => {
	return (
		<section className="bg-gray-50 py-12">
			<div className="container mx-auto px-4">
				<h2 className="mb-6 text-center font-semibold text-2xl">
					Lo que dicen nuestros usuarios
				</h2>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{[
						{
							name: "María González",
							role: "Desarrolladora Web",
							content:
								"Gracias a Lules Jobs encontré mi trabajo ideal en una startup local. El proceso fue rápido y sencillo.",
						},
						{
							name: "Juan Pérez",
							role: "Gerente de Recursos Humanos",
							content:
								"Como empresa, hemos encontrado excelentes candidatos a través de esta plataforma. Es nuestra primera opción para publicar ofertas.",
						},
						{
							name: "Laura Sánchez",
							role: "Profesora",
							content:
								"La variedad de ofertas en el sector educativo me sorprendió gratamente. Recomiendo Lules Jobs a todos mis colegas.",
						},
					].map((testimonial) => (
						<Card key={testimonial.name}>
							<CardHeader>
								<CardTitle>{testimonial.name}</CardTitle>
								<p className="text-muted-foreground text-sm">
									{testimonial.role}
								</p>
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
