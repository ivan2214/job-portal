import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AdminSummaryProps = {
	usersTotal: number;
	companiesTotal: number;
	jobsTotal: number;
	applicationsTotal: number;
};

export const AdminSummary: React.FC<AdminSummaryProps> = ({
	usersTotal,
	companiesTotal,
	jobsTotal,
	applicationsTotal,
}) => {
	return (
		<div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="font-medium text-sm">
						Usuarios Totales
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="font-bold text-2xl">{usersTotal}</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="font-medium text-sm">Empresas</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="font-bold text-2xl">{companiesTotal}</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="font-medium text-sm">
						Empleos Publicados
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="font-bold text-2xl">{jobsTotal}</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="font-medium text-sm">Postulaciones</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="font-bold text-2xl">{applicationsTotal}</div>
				</CardContent>
			</Card>
		</div>
	);
};
