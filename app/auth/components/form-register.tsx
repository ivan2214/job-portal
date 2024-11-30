"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {} from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
	email: z.string().email({ message: "Correo electrónico inválido" }),
	password: z
		.string()
		.min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
	role: z.enum(["postulante", "empleador"], {
		required_error: "Debe seleccionar un rol",
	}),
});

type FormRegisterProps = {};

export const FormRegister: React.FC<FormRegisterProps> = ({}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(formSchema),
	});

	return (
		<form>
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="register-email">Correo Electrónico</Label>
					<Input id="register-email" type="email" {...register("email")} />
					{errors.email && (
						<Alert variant="destructive">
							<AlertDescription>
								{errors.email.message?.toString()}
							</AlertDescription>
						</Alert>
					)}
				</div>
				<div className="space-y-2">
					<Label htmlFor="register-password">Contraseña</Label>
					<Input
						id="register-password"
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
							<RadioGroupItem value="postulante" id="postulante" />
							<Label htmlFor="postulante">Postulante</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="empleador" id="empleador" />
							<Label htmlFor="empleador">Empleador</Label>
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
				Registrarse
			</Button>
		</form>
	);
};
