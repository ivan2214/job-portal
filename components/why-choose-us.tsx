import { Briefcase, Star, Users } from "lucide-react";

type WhyChooseUsProps = {};

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({}) => {
	return (
		<section className="py-12">
			<div className="container mx-auto px-4">
				<h2 className="mb-6 text-center font-semibold text-2xl">
					¿Por qué elegir Lules Jobs?
				</h2>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					<div className="text-center">
						<div className="mb-4 inline-block rounded-full bg-primary/10 p-4">
							<Briefcase className="h-8 w-8 text-primary" />
						</div>
						<h3 className="mb-2 font-semibold text-lg">Empleos Locales</h3>
						<p className="text-muted-foreground">
							Conectamos talento con empresas de Lules y alrededores.
						</p>
					</div>
					<div className="text-center">
						<div className="mb-4 inline-block rounded-full bg-primary/10 p-4">
							<Users className="h-8 w-8 text-primary" />
						</div>
						<h3 className="mb-2 font-semibold text-lg">Comunidad Activa</h3>
						<p className="text-muted-foreground">
							Únete a una comunidad de profesionales y empresas locales.
						</p>
					</div>
					<div className="text-center">
						<div className="mb-4 inline-block rounded-full bg-primary/10 p-4">
							<Star className="h-8 w-8 text-primary" />
						</div>
						<h3 className="mb-2 font-semibold text-lg">
							Oportunidades de Calidad
						</h3>
						<p className="text-muted-foreground">
							Empleos verificados y de calidad en diversos sectores.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};
