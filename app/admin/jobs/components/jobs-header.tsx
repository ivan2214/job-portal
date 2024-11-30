import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function JobsHeader() {
	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="font-bold text-3xl tracking-tight">
					Manage Job Postings
				</h1>
			</div>
			<div className="relative">
				<Search className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground" />
				<Input
					placeholder="Search jobs by title, company, or location..."
					className="pl-8"
				/>
			</div>
		</div>
	);
}
