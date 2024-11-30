"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ApplicationsPagination({
	applicationsTotal,
}: { applicationsTotal: number }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const currentPage = Number.parseInt(searchParams.get("page") || "1");
	const pathname = usePathname();

	// Calcular el total de páginas disponibles
	const totalPages = Math.ceil(applicationsTotal / 10);

	// Navegar a una página específica
	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", newPage.toString());
		router.push(`${pathname}?${params.toString()}`);
	};

	// Deshabilitar los botones si estamos en la primera o última página
	const isDisabledButtonRight = currentPage === totalPages;
	const isDisabledButtonLeft = currentPage === 1;

	// Generar un rango de números de páginas alrededor de la página actual
	const pageNumbers = [];
	const range = 1; // Número de páginas antes y después de la página actual
	for (
		let i = Math.max(1, currentPage - range);
		i <= Math.min(totalPages, currentPage + range);
		i++
	) {
		pageNumbers.push(i);
	}

	return (
		<div className="mt-6 flex flex-col items-center space-y-2">
			{/* Botones de navegación */}
			<div className="flex justify-center space-x-2">
				<Button
					variant="outline"
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={isDisabledButtonLeft}
				>
					Previous
				</Button>
				<Button variant="outline" disabled>
					Page {currentPage}
				</Button>
				<Button
					variant="outline"
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={isDisabledButtonRight}
				>
					Next
				</Button>
			</div>

			{/* Números de páginas */}
			<div className="flex space-x-2">
				{pageNumbers.map((pageNum) => (
					<Button
						key={pageNum}
						variant={pageNum === currentPage ? "default" : "outline"}
						onClick={() => handlePageChange(pageNum)}
					>
						{pageNum}
					</Button>
				))}
			</div>
		</div>
	);
}
