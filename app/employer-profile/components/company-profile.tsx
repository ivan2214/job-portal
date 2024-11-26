"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CompanyProfile() {
	const [isEditing, setIsEditing] = useState(false);
	const [company, setCompany] = useState({
		name: "Nombre de la Empresa",
		logo: "http://via.placeholder.com/100x100",
		description: "Descripción de la empresa...",
	});

	const handleEdit = () => {
		setIsEditing(!isEditing);
	};

	const handleSave = () => {
		// Aquí iría la lógica para guardar los cambios
		setIsEditing(false);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center justify-between">
					Información de la Empresa
					<Button onClick={isEditing ? handleSave : handleEdit}>
						{isEditing ? "Guardar" : "Editar"}
					</Button>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="mb-4 flex items-center space-x-4">
					<img
						src={company.logo || "http://via.placeholder.com/100x100"}
						alt="Logo de la empresa"
						className="h-16 w-16 rounded-full"
					/>
					{isEditing ? (
						<Input
							value={company.name}
							onChange={(e) => setCompany({ ...company, name: e.target.value })}
							className="flex-grow"
						/>
					) : (
						<h2 className="font-bold text-2xl">{company.name}</h2>
					)}
				</div>
				{isEditing ? (
					<Textarea
						value={company.description}
						onChange={(e) =>
							setCompany({ ...company, description: e.target.value })
						}
						className="w-full"
						rows={4}
					/>
				) : (
					<p>{company.description}</p>
				)}
			</CardContent>
		</Card>
	);
}
