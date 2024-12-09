"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

interface AdminChartProps {
	data: {
		name: string;
		usuarios: number;
		compañias: number;
		empleos: number;
		aplicaciones: number;
	}[];
}

export const AdminChart: React.FC<AdminChartProps> = ({ data }) => {
	return (
		<Card className="mb-8">
			<CardHeader>
				<CardTitle>Estadísticas Mensuales</CardTitle>
			</CardHeader>

			<CardContent>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="usuarios" fill="#8884d8" />
						<Bar dataKey="compañias" fill="#82ca9d" />
						<Bar dataKey="empleos" fill="#ffc658" />
						<Bar dataKey="aplicaciones" fill="#ff6666" />
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
};
