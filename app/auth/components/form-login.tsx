"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormLoginProps = {};

const formSchema = z.object({
	email: z.string().email({ message: "Correo electrónico inválido" }),
	password: z
		.string()
		.min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
	role: z.enum(["postulante", "empleador"], {
		required_error: "Debe seleccionar un rol",
	}),
});

export const FormLogin: React.FC<FormLoginProps> = ({}) => {
	const {
		register,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(formSchema),
	});

	return (
		<form>
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="login-email">Correo Electrónico</Label>
					<Input id="login-email" type="email" {...register("email")} />
					{errors.email && (
						<Alert variant="destructive">
							<AlertDescription>
								{errors.email.message?.toString()}
							</AlertDescription>
						</Alert>
					)}
				</div>
				<div className="space-y-2">
					<Label htmlFor="login-password">Contraseña</Label>
					<Input
						id="login-password"
						type="password"
						{...register("password")}
					/>
					{errors.password && (
						<Alert variant="destructive">
							<AlertDescription>
								{errors.password.message?.toString()}
							</AlertDescription>
						</Alert>
					)}
				</div>
				<div className="space-y-2">
					<Label>Rol</Label>
					<RadioGroup defaultValue="postulante" {...register("role")}>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="postulante" id="postulante-login" />
							<Label htmlFor="postulante-login">Postulante</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="empleador" id="empleador-login" />
							<Label htmlFor="empleador-login">Empleador</Label>
						</div>
					</RadioGroup>
					{errors.role && (
						<Alert variant="destructive">
							<AlertDescription>
								{errors.role.message?.toString()}
							</AlertDescription>
						</Alert>
					)}
				</div>
			</div>
			<Button type="submit" className="mt-4 w-full">
				Iniciar Sesión
			</Button>
		</form>
	);
};
