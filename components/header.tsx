import Link from "next/link";

interface HeaderProps {
  
}

export const Header: React.FC<HeaderProps> = ({  }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
     {/*  <Link href="/" className="flex items-center space-x-2">
        <Image src="/logo.svg" alt="Lules Jobs Logo" width={40} height={40} />
        <span className="text-xl font-bold text-primary">Lules Jobs</span>
      </Link> */}
      <span className="text-xl font-bold text-primary">Lules Jobs</span>
      <nav>
        <ul className="flex space-x-4">
          <li><Link href="/" className="text-sm font-medium hover:text-primary">Inicio</Link></li>
          <li><Link href="/empleos" className="text-sm font-medium hover:text-primary">Empleos</Link></li>
          <li><Link href="/empresas" className="text-sm font-medium hover:text-primary">Empresas</Link></li>
          <li><Link href="/blog" className="text-sm font-medium hover:text-primary">Blog</Link></li>
          <li><Link href="/login" className="text-sm font-medium hover:text-primary">Iniciar Sesión</Link></li>
          <li><Link href="/registro" className="text-sm font-medium bg-primary text-white px-3 py-2 rounded-md hover:bg-primary/90">Registrarse</Link></li>
        </ul>
      </nav>
    </div>
  </header>
  );
};
