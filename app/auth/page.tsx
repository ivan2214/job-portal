import {} from "@/components/ui/alert";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {} from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {} from "react";
import { FormRegister } from "./components/form-register";
import { FormLogin } from "./components/form-login";

type SearchParams = Promise<{
	type?: "register" | "login";
}>;

export default async function AuthPage({
	searchParams,
}: {
	searchParams?: SearchParams;
}) {
	const params = await searchParams;

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
					<Tabs value={params?.type}>
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="register">Registrarse</TabsTrigger>
							<TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
						</TabsList>
						<TabsContent value="register">
							<FormRegister />
						</TabsContent>
						<TabsContent value="login">
							<FormLogin />
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
