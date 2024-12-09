"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Company } from "@prisma/client";
import { useState } from "react";

export default function CompanyProfile({
	company,
}: {
	company: Company;
}) {
	const [isEditing, setIsEditing] = useState(false);

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
						<Input value={company.name} className="flex-grow" />
					) : (
						<h2 className="font-bold text-2xl">{company.name}</h2>
					)}
				</div>
				{isEditing ? (
					<Textarea value={company.description} className="w-full" rows={4} />
				) : (
					<p>{company.description}</p>
				)}
			</CardContent>
		</Card>
	);
}
