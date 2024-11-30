import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type FiltersProps = {};

export const FiltersApplications: React.FC<FiltersProps> = ({}) => {
	return (
		<div className="mb-6 grid gap-4 md:grid-cols-2">
			<div>
				<Label htmlFor="status-filter">Filter by Status</Label>
				<Select>
					<SelectTrigger id="status-filter">
						<SelectValue placeholder="Select status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="All">All</SelectItem>
						<SelectItem value="Pending">Pending</SelectItem>
						<SelectItem value="Accepted">Accepted</SelectItem>
						<SelectItem value="Rejected">Rejected</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div>
				<Label htmlFor="title-filter">Filter by Job Title</Label>
				<Input id="title-filter" placeholder="Enter job title" />
			</div>
		</div>
	);
};
