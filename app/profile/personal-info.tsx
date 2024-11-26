"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function PersonalInfo() {
	const [name, setName] = useState("John Doe");
	const [email, setEmail] = useState("john@example.com");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// Simular una actualización
		await new Promise((resolve) => setTimeout(resolve, 1000));
		toast.success("Perfil actualizado", {
			description: "Tu información personal ha sido actualizada con éxito.",
		});
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<Label htmlFor="name">Nombre</Label>
				<Input
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div>
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<Button type="submit">Guardar cambios</Button>
		</form>
	);
}
