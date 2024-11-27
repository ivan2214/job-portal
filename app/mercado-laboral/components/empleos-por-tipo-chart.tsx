"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
	{ tipo: "Tiempo completo", valor: 60 },
	{ tipo: "Medio tiempo", valor: 25 },
	{ tipo: "Temporal", valor: 15 },
];

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"];

export function EmpleosPorTipoChart() {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<PieChart>
				<Pie
					data={data}
					cx="50%"
					cy="50%"
					outerRadius={80}
					fill="#8884d8"
					dataKey="valor"
					label={({ name, percent }) =>
						`${name} ${(percent * 100).toFixed(0)}%`
					}
				>
					{data.map((entry, index) => (
						<Cell
							key={`cell-${entry.valor}`}
							fill={COLORS[index % COLORS.length]}
						/>
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	);
}
