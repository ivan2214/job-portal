"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
	{ categoria: "Agricultura", demanda: 250 },
	{ categoria: "Comercio", demanda: 180 },
	{ categoria: "Servicios", demanda: 150 },
	{ categoria: "Construcción", demanda: 120 },
	{ categoria: "Educación", demanda: 90 },
];

export function CategoriasDemandasChart() {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<BarChart data={data}>
				<XAxis dataKey="categoria" />
				<YAxis />
				<Bar dataKey="demanda" fill="var(--chart-1)" />
			</BarChart>
		</ResponsiveContainer>
	);
}
