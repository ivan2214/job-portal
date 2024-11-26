import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination() {
	return (
		<div className="mt-8 flex items-center justify-center space-x-2">
			<Button variant="outline" size="icon">
				<ChevronLeft className="h-4 w-4" />
			</Button>
			<Button variant="outline">1</Button>
			<Button variant="outline">2</Button>
			<Button variant="outline">3</Button>
			<Button variant="outline" size="icon">
				<ChevronRight className="h-4 w-4" />
			</Button>
		</div>
	);
}
