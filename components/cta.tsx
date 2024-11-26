import { Button } from "@/components/ui/button";

interface CtaProps {
    
}

export const Cta: React.FC<CtaProps> = ({  }) => {
    return (
        <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold mb-4">¿Listo para encontrar tu próximo empleo?</h2>
          <p className="mb-6">Únete a miles de profesionales que ya han encontrado su oportunidad ideal en Lules Jobs</p>
          <Button size="lg" variant="secondary">Crear mi perfil gratis</Button>
        </div>
      </section>
    );
};
