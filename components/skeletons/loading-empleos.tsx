import { Skeleton } from "@/components/skeleton";

export default function LoadingEmpleos() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="mb-8 font-bold text-3xl text-gray-800">
				Empleos en Lules, Tucumán
			</h1>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{[...Array(6)].map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div key={index} className="rounded-lg bg-white p-6 shadow-md">
						<Skeleton type="image" className="mb-4 rounded-full" />
						<Skeleton className="mb-2 w-3/4" />
						<Skeleton className="mb-4 w-1/2" />
						<Skeleton className="mb-2" />
						<Skeleton className="mb-2" />
						<Skeleton className="w-1/4" />
					</div>
				))}
			</div>

			<div className="mt-12">
				<Skeleton type="highlight" className="mb-6" />
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<Skeleton className="mb-2 h-8" />
					<Skeleton className="mb-2 h-8" />
					<Skeleton className="mb-2 h-8" />
					<Skeleton className="mb-2 h-8" />
				</div>
			</div>
		</div>
	);
}
