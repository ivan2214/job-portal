import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivitySummaryProps {
	title: string;
	count: number;
	icon: React.ReactNode;
}

export function ActivitySummary({ title, count, icon }: ActivitySummaryProps) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="font-medium text-sm">{title}</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				<div className="font-bold text-2xl">{count}</div>
			</CardContent>
		</Card>
	);
}
