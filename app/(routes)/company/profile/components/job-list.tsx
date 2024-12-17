"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Job } from "@prisma/client";

export default function JobList({
	jobs,
}: {
	jobs: Job[] | null;
}) {
	const handleEdit = (id: string) => {
		// Lógica para editar el trabajo
		console.log("Editar trabajo", id);
	};

	const handleDelete = (id: string) => {
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
					{jobs?.map((job) => (
						<li key={job.id} className="border-b pb-4 last:border-b-0">
							<h3 className="font-semibold text-lg">{job.title}</h3>
							<p className="mb-2 text-gray-600 text-sm">{job.description}</p>
							<div className="flex items-center justify-between">
								<span className="text-sm">
									{job.salaryText} | {job.location}
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
