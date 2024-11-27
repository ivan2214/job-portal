"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
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

export default function AuthPage({
	searchParams,
}: {
	searchParams?: { type?: "register" | "login" };
}) {
	const [activeTab, setActiveTab] = useState<string>(
		searchParams?.type || "register",
	);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = (data) => {
		console.log(data);
		// Aquí iría la lógica de autenticación
	};

	useEffect(() => {
		setActiveTab(searchParams?.type || "register");
	}, [searchParams]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<Card className="w-full max-w-2xl">
				<CardHeader>
					<CardTitle>Bienvenido</CardTitle>
					<CardDescription>
						Regístrate o inicia sesión para continuar
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs value={activeTab} onValueChange={setActiveTab}>
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="register">Registrarse</TabsTrigger>
							<TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
						</TabsList>
						<TabsContent value="register">
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="register-email">Correo Electrónico</Label>
										<Input
											id="register-email"
											type="email"
											{...register("email")}
										/>
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
						</TabsContent>
						<TabsContent value="login">
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="login-email">Correo Electrónico</Label>
										<Input
											id="login-email"
											type="email"
											{...register("email")}
										/>
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
												<RadioGroupItem
													value="postulante"
													id="postulante-login"
												/>
												<Label htmlFor="postulante-login">Postulante</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem
													value="empleador"
													id="empleador-login"
												/>
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
						</TabsContent>
					</Tabs>
				</CardContent>
				<CardFooter className="flex justify-center">
					<Link
						href="/forgot-password"
						className="text-blue-600 text-sm hover:underline"
					>
						¿Olvidaste tu contraseña?
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
