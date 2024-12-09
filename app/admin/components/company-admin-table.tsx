import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Company } from "@prisma/client";
import { Eye, Pencil, Trash } from "lucide-react";
import Link from "next/link";
interface CompanyAdminTableProps {
	companies: Company[];
}

export const CompanyAdminTable: React.FC<CompanyAdminTableProps> = ({
	companies,
}) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Gestión de Empresas</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="mb-4 flex justify-between">
					<Input placeholder="Buscar empleos..." className="max-w-sm" />
					<Select>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Filtrar por estado" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="todos">Todos</SelectItem>
							<SelectItem value="activo">Activo</SelectItem>
							<SelectItem value="cerrado">Cerrado</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Empresa</TableHead>
							<TableHead>Ubicación</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Teléfono</TableHead>
							<TableHead>Posiciones Abiertas</TableHead>
							<TableHead>Acciones</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{companies.map((company) => {
							return (
								<TableRow key={company.userId}>
									<TableCell>{company.name}</TableCell>
									<TableCell>{company.location}</TableCell>
									<TableCell>{company.email}</TableCell>
									<TableCell>{company.phone}</TableCell>
									<TableCell>{company.openPositions}</TableCell>
									<TableCell className="flex items-center space-x-2">
										<Button
											variant="outline"
											size="sm"
											className="mr-2"
											asChild
										>
											<Link href={`/admin/companies/${company.userId}`}>
												<Eye className="mr-2 h-4 w-4" size={20} />
												Ver
											</Link>
										</Button>
										<Button variant="outline" size="sm" className="">
											<Pencil className="mr-2 h-4 w-4" size={20} />
											Editar
										</Button>
										<Button variant="destructive" size="sm">
											<Trash className="mr-2 h-4 w-4" size={20} />
											Eliminar
										</Button>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};
