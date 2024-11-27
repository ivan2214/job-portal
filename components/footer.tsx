import Link from "next/link";
import { Container } from "./container";

type FooterProps = {};

export const Footer: React.FC<FooterProps> = ({}) => {
	return (
		<footer className=" py-8 ">
			<Container>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-4">
					<div>
						<h3 className="mb-4 font-semibold text-lg">Acerca de Lules Jobs</h3>
						<p className="text-sm">
							Conectamos talento local con oportunidades laborales en Lules y
							alrededores.
						</p>
					</div>
					<div>
						<h3 className="mb-4 font-semibold text-lg">Enlaces Rápidos</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/sobre-nosotros"
									className="text-sm hover:underline"
								>
									Sobre Nosotros
								</Link>
							</li>
							<li>
								<Link href="/como-funciona" className="text-sm hover:underline">
									Cómo Funciona
								</Link>
							</li>
							<li>
								<Link href="/precios" className="text-sm hover:underline">
									Precios
								</Link>
							</li>
							<li>
								<Link href="/contacto" className="text-sm hover:underline">
									Contacto
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="mb-4 font-semibold text-lg">Para Empresas</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/publicar-empleo"
									className="text-sm hover:underline"
								>
									Publicar Empleo
								</Link>
							</li>
							<li>
								<Link
									href="/buscar-candidatos"
									className="text-sm hover:underline"
								>
									Buscar Candidatos
								</Link>
							</li>
							<li>
								<Link href="/recursos-rrhh" className="text-sm hover:underline">
									Recursos de RRHH
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="mb-4 font-semibold text-lg">Contáctanos</h3>
						<p className="text-sm">Email: info@lulesjobs.com</p>
						<p className="text-sm">Teléfono: (381) 123-4567</p>
						<p className="text-sm">
							Dirección: Av. Principal 123, Lules, Tucumán
						</p>
					</div>
				</div>
				<div className="mt-8 text-center text-sm">
					<p>&copy; 2023 Lules Jobs. Todos los derechos reservados.</p>
					<div className="mt-2">
						<Link href="/privacidad" className="hover:underline">
							Política de Privacidad
						</Link>
						{" | "}
						<Link href="/terminos" className="hover:underline">
							Términos de Servicio
						</Link>
					</div>
				</div>
			</Container>
		</footer>
	);
};
