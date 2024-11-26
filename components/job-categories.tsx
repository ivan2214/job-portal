import Link from "next/link";

interface JobCategoriesProps {
    
}

export const JobCategories: React.FC<JobCategoriesProps> = ({  }) => {
    return (
        <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6 text-center">Categorías de Empleo</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Tecnología", "Administración", "Ventas", "Educación",
              "Salud", "Construcción", "Turismo", "Agricultura"
            ].map((category, index) => (
              <Link href={`/categoria/${category.toLowerCase()}`} key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold">{category}</h3>
                <p className="text-sm text-muted-foreground mt-1">Ver empleos</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
};
