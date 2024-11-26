"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function JobList() {
	const jobs = [
		{
			id: 1,
			title: "Desarrollador Frontend",
			description: "Experiencia en React...",
			salary: "40,000 - 60,000",
			location: "Remoto",
		},
		{
			id: 2,
			title: "Diseñador UX/UI",
			description: "Crear experiencias de usuario...",
			salary: "35,000 - 55,000",
			location: "Madrid",
		},
	];

	const handleEdit = (id: number) => {
		// Lógica para editar el trabajo
		console.log("Editar trabajo", id);
	};

	const handleDelete = (id: number) => {
		// Lógica para eliminar el trabajo
		console.log("Eliminar trabajo", id);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Trabajos Publicados</CardTitle>
			</CardHeader>
			<CardContent>
				<ul className="space-y-4">
					{jobs.map((job) => (
						<li key={job.id} className="border-b pb-4 last:border-b-0">
							<h3 className="font-semibold text-lg">{job.title}</h3>
							<p className="mb-2 text-gray-600 text-sm">{job.description}</p>
							<div className="flex items-center justify-between">
								<span className="text-sm">
									{job.salary} | {job.location}
								</span>
								<div className="space-x-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleEdit(job.id)}
									>
										Editar
									</Button>
									<Button
										variant="destructive"
										size="sm"
										onClick={() => handleDelete(job.id)}
									>
										Eliminar
									</Button>
								</div>
							</div>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
}
