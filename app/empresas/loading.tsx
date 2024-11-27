export default function loading() {
	return (
		<div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{[...Array(6)].map((_, i) => (
				<div
					key={i}
					className="animate-pulse rounded-lg bg-white p-6 shadow-md"
				>
					<div className="mb-4 h-16 w-16 rounded-full bg-gray-300" />
					<div className="mb-2 h-4 w-3/4 rounded bg-gray-300" />
					<div className="mb-2 h-3 w-1/2 rounded bg-gray-300" />
					<div className="h-3 w-1/4 rounded bg-gray-300" />
				</div>
			))}
		</div>
	);
}
