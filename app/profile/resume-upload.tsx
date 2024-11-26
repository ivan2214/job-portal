"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export function ResumeUpload() {
	const [file, setFile] = useState<File | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			setFile(e.target.files[0]);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!file) {
			toast.error("Error", {
				description: "Por favor, selecciona un archivo PDF.",
			});
			return;
		}
		// Simular subida de archivo
		await new Promise((resolve) => setTimeout(resolve, 1000));
		toast.success("CV actualizado", {
			description: "Tu currículum ha sido actualizado con éxito.",
		});
		setFile(null);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<Label htmlFor="resume">Subir CV (PDF)</Label>
				<Input
					id="resume"
					type="file"
					accept=".pdf"
					onChange={handleFileChange}
				/>
			</div>
			{file && <p>Archivo seleccionado: {file.name}</p>}
			<Button type="submit">Subir CV</Button>
		</form>
	);
}
