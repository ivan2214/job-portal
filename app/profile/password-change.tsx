"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export function PasswordChange() {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (newPassword !== confirmPassword) {
			toast.error("Error", {
				description: "Las contraseñas nuevas no coinciden.",
			});
			return;
		}
		// Simular cambio de contraseña
		await new Promise((resolve) => setTimeout(resolve, 1000));
		toast.success("Contraseña actualizada", {
			description: "Tu contraseña ha sido cambiada con éxito.",
		});
		setCurrentPassword("");
		setNewPassword("");
		setConfirmPassword("");
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<Label htmlFor="current-password">Contraseña actual</Label>
				<Input
					id="current-password"
					type="password"
					value={currentPassword}
					onChange={(e) => setCurrentPassword(e.target.value)}
				/>
			</div>
			<div>
				<Label htmlFor="new-password">Nueva contraseña</Label>
				<Input
					id="new-password"
					type="password"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
			</div>
			<div>
				<Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
				<Input
					id="confirm-password"
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
			</div>
			<Button type="submit">Cambiar contraseña</Button>
		</form>
	);
}
