"use client";

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
	{ mes: "Ene", salario: 35000 },
	{ mes: "Feb", salario: 35500 },
	{ mes: "Mar", salario: 36000 },
	{ mes: "Abr", salario: 36200 },
	{ mes: "May", salario: 36800 },
	{ mes: "Jun", salario: 37200 },
];

export function SalariosPromedioChart() {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<LineChart data={data}>
				<XAxis dataKey="mes" />
				<YAxis />
				<Line type="monotone" dataKey="salario" stroke="var(--chart-2)" />
			</LineChart>
		</ResponsiveContainer>
	);
}
