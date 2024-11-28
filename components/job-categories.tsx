import { prisma } from "@/db";
import Link from "next/link";
import { Container } from "./container";

type JobCategoriesProps = {};

export const JobCategories: React.FC<JobCategoriesProps> = async ({}) => {
	const categoriesJobs = await prisma.categoryJob.findMany({
		select: {
			id: true,
			name: true,
			_count: {
				select: {
					jobs: true,
				},
			},
		},
	});
	return (
		<section className="bg-gray-50 py-12">
			<Container>
				<h2 className="mb-6 text-center font-semibold text-2xl">
					Categorías de Empleos
				</h2>
				<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
					{categoriesJobs.map((category) => (
						<Link
							href={`/empleos?category=${category.name.toLowerCase()}`}
							key={category.id}
							className="rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
						>
							<h3 className="font-semibold">{category.name}</h3>
							<span className="mt-2 block font-semibold text-2xl">
								{category._count.jobs}
							</span>
							<p className="mt-1 text-muted-foreground text-sm">Ver empleos</p>
						</Link>
					))}
				</div>
			</Container>
		</section>
	);
};
