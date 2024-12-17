import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const logs = [
	{
		id: 1,
		action: "Settings updated",
		admin: "John Doe",
		timestamp: "2023-06-15 14:30:00",
	},
	{
		id: 2,
		action: "New role created",
		admin: "Jane Smith",
		timestamp: "2023-06-14 09:15:00",
	},
	{
		id: 3,
		action: "User account deleted",
		admin: "Mike Johnson",
		timestamp: "2023-06-13 16:45:00",
	},
];

export default function SystemLogs() {
	return (
		<div className="space-y-6">
			<h2 className="font-semibold text-2xl">System Logs</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Action</TableHead>
						<TableHead>Admin</TableHead>
						<TableHead>Timestamp</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{logs.map((log) => (
						<TableRow key={log.id}>
							<TableCell>{log.action}</TableCell>
							<TableCell>{log.admin}</TableCell>
							<TableCell>{log.timestamp}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
