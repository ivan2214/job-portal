import { Container } from "@/components/container";
import {} from "@/components/ui/alert";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {} from "@/components/ui/radio-group";
import {} from "@/components/ui/tabs";
import {} from "react";
import { FormAuth } from "./components/form-auth";

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
		<Container>
			<Card className="mx-auto my-10 w-full max-w-md">
				<CardHeader>
					<CardTitle>Bienvenido</CardTitle>
					<CardDescription>
						Regístrate o inicia sesión para continuar
					</CardDescription>
				</CardHeader>

				<FormAuth type={params?.type} />
			</Card>
		</Container>
	);
}
