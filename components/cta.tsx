import { Button } from "@/components/ui/button";
import { Container } from "./container";

type CtaProps = {};

export const Cta: React.FC<CtaProps> = ({}) => {
	return (
		<section className="bg-primary py-12 text-white">
			<Container className="text-center">
				<h2 className="mb-4 font-semibold text-2xl">
					¿Listo para encontrar tu próximo empleo?
				</h2>
				<p className="mb-6">
					Únete a miles de profesionales que ya han encontrado su oportunidad
					ideal en Lules Jobs
				</p>
				<Button size="lg" variant="secondary">
					Crear mi perfil gratis
				</Button>
			</Container>
		</section>
	);
};
