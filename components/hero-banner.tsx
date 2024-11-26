import { Button } from "@/components/ui/button";

interface HeroBannerProps {
  
}

export const HeroBanner: React.FC<HeroBannerProps> = ({  }) => {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-16">
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Encuentra tu próximo empleo en Lules, Tucumán</h1>
      <p className="text-xl mb-8">Conectamos talento local con las mejores oportunidades laborales</p>
      <div className="flex justify-center space-x-4">
        <Button size="lg" variant="secondary">Explorar Empleos</Button>
        <Button size="lg" variant="outline">Para Empresas</Button>
      </div>
    </div>
  </section>
  );
};


