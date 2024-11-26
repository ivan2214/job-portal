"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewJobForm() {
	const [job, setJob] = useState({
		title: "",
		description: "",
		salary: "",
		location: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Aquí iría la lógica para publicar el nuevo trabajo
		console.log("Nuevo trabajo:", job);
		// Reiniciar el formulario
		setJob({ title: "", description: "", salary: "", location: "" });
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setJob((prevJob) => ({ ...prevJob, [name]: value }));
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Publicar Nuevo Empleo</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							htmlFor="title"
							className="mb-1 block font-medium text-gray-700 text-sm"
						>
							Título
						</label>
						<Input
							id="title"
							name="title"
							value={job.title}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label
							htmlFor="description"
							className="mb-1 block font-medium text-gray-700 text-sm"
						>
							Descripción
						</label>
						<Textarea
							id="description"
							name="description"
							value={job.description}
							onChange={handleChange}
							required
							rows={4}
						/>
					</div>
					<div>
						<label
							htmlFor="salary"
							className="mb-1 block font-medium text-gray-700 text-sm"
						>
							Salario
						</label>
						<Input
							id="salary"
							name="salary"
							value={job.salary}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label
							htmlFor="location"
							className="mb-1 block font-medium text-gray-700 text-sm"
						>
							Ubicación
						</label>
						<Input
							id="location"
							name="location"
							value={job.location}
							onChange={handleChange}
							required
						/>
					</div>
					<Button type="submit" className="w-full">
						Publicar Empleo
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
