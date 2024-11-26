import { ArrowRight, Briefcase, MapPin, Star, Users } from 'lucide-react'


interface WhyChooseUsProps {
    
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({  }) => {
    return (
        <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6 text-center">¿Por qué elegir Lules Jobs?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 inline-block mb-4">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Empleos Locales</h3>
              <p className="text-muted-foreground">Conectamos talento con empresas de Lules y alrededores.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 inline-block mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Comunidad Activa</h3>
              <p className="text-muted-foreground">Únete a una comunidad de profesionales y empresas locales.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 inline-block mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Oportunidades de Calidad</h3>
              <p className="text-muted-foreground">Empleos verificados y de calidad en diversos sectores.</p>
            </div>
          </div>
        </div>
      </section>
    );
};
