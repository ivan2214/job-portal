"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UserWithRelations } from "@/types";
import { toast } from "sonner";

export function PersonalInfo({
	user,
}: {
	user: UserWithRelations;
}) {
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
				<Input id="name" value={user.name || ""} />
			</div>
			<div>
				<Label htmlFor="email">Email</Label>
				<Input id="email" type="email" value={user.email} />
			</div>
			<Button type="submit">Guardar cambios</Button>
		</form>
	);
}
