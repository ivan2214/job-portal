import Link from "next/link";

type JobCategoriesProps = {};

export const JobCategories: React.FC<JobCategoriesProps> = ({}) => {
	return (
		<section className="bg-gray-50 py-12">
			<div className="container mx-auto px-4">
				<h2 className="mb-6 text-center font-semibold text-2xl">
					Categorías de Empleo
				</h2>
				<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
					{[
						"Tecnología",
						"Administración",
						"Ventas",
						"Educación",
						"Salud",
						"Construcción",
						"Turismo",
						"Agricultura",
					].map((category) => (
						<Link
							href={`/categoria/${category.toLowerCase()}`}
							key={category}
							className="rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
						>
							<h3 className="font-semibold">{category}</h3>
							<p className="mt-1 text-muted-foreground text-sm">Ver empleos</p>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};
