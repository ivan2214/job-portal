import { Button } from "@/components/ui/button";
import { Container } from "./container";

type HeroBannerProps = {};

export const HeroBanner: React.FC<HeroBannerProps> = ({}) => {
	return (
		<section className="bg-gradient-to-r from-primary to-primary-foreground py-16 text-white">
			<Container>
				<h1 className="mb-4 font-bold text-4xl">
					Encuentra tu próximo empleo en Lules, Tucumán
				</h1>
				<p className="mb-8 text-xl">
					Conectamos talento local con las mejores oportunidades laborales
				</p>
				<div className="flex justify-center space-x-4">
					<Button size="lg">Explorar Empleos</Button>
					<Button size="lg" variant="secondary">
						Para Empresas
					</Button>
				</div>
			</Container>
		</section>
	);
};
