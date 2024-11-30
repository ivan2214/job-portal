import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryCardProps {
	title: string;
	value: number;
}

export function SummaryCard({ title, value }: SummaryCardProps) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="font-medium text-sm">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="font-bold text-2xl">{value}</div>
			</CardContent>
		</Card>
	);
}
