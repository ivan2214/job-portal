import Link from "next/link";

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = ({}) => {
	return (
		<header className="sticky top-0 z-50 bg-white shadow-sm">
			<div className="container mx-auto flex items-center justify-between px-4 py-4">
				{/*  <Link href="/" className="flex items-center space-x-2">
        <Image src="/logo.svg" alt="Lules Jobs Logo" width={40} height={40} />
        <span className="text-xl font-bold text-primary">Lules Jobs</span>
      </Link> */}
				<span className="font-bold text-primary text-xl">Lules Jobs</span>
				<nav>
					<ul className="flex space-x-4">
						<li>
							<Link href="/" className="font-medium text-sm hover:text-primary">
								Inicio
							</Link>
						</li>
						<li>
							<Link
								href="/empleos"
								className="font-medium text-sm hover:text-primary"
							>
								Empleos
							</Link>
						</li>
						<li>
							<Link
								href="/empresas"
								className="font-medium text-sm hover:text-primary"
							>
								Empresas
							</Link>
						</li>
						<li>
							<Link
								href="/blog"
								className="font-medium text-sm hover:text-primary"
							>
								Blog
							</Link>
						</li>
						<li>
							<Link
								href="/login"
								className="font-medium text-sm hover:text-primary"
							>
								Iniciar Sesión
							</Link>
						</li>
						<li>
							<Link
								href="/registro"
								className="rounded-md bg-primary px-3 py-2 font-medium text-sm text-white hover:bg-primary/90"
							>
								Registrarse
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};