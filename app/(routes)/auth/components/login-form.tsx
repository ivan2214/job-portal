"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { login } from "@/actions/login";
import { CardWrapper } from "@/app/(routes)/auth/components/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormLoginSchema } from "@/schemas/auth-schema";

export const LoginForm = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");
	const urlError =
		searchParams.get("error") === "OAuthAccountNotLinked"
			? "Correo electrónico ya en uso con otro proveedor!"
			: "";

	const [showTwoFactor, setShowTwoFactor] = useState(false);
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof FormLoginSchema>>({
		resolver: zodResolver(FormLoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof FormLoginSchema>) => {
		setError("");
		setSuccess("");
		startTransition(() => {
			login(values, callbackUrl)
				.then((data) => {
					if (data?.error) {
						form.reset();
						setError(data?.error);
					}
					if (data?.success) {
						form.reset();
						setSuccess(data?.success);
					}
					if (data?.twoFactor) {
						setShowTwoFactor(true);
					}
				})
				.catch((e) => setError(e.message));
		});
	};

	return (
		<CardWrapper
			showSocial
			backButtonHref="/auth/register"
			backButtonLabel="No tienes una cuenta?"
			headderLabel="Bienvenido de nuevo"
		>
			<Form {...form}>
				<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="space-y-4">
						{showTwoFactor ? (
							<FormField
								control={form.control}
								name="code"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Two Factor Code</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={isPending}
												placeholder="123456"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						) : null}
						{!showTwoFactor && (
							<>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													{...field}
													disabled={isPending}
													placeholder="ejemplo@gmail.com"
													type="email"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Contraseña</FormLabel>
											<FormControl>
												<Input
													{...field}
													disabled={isPending}
													placeholder="********"
													type="password"
												/>
											</FormControl>
											<Button
												asChild
												className="px-0 font-normal"
												size="sm"
												variant="link"
											>
												<Link href="/auth/reset">
													Has olvidado tu contraseña?
												</Link>
											</Button>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}
					</div>
					<FormError message={error || urlError} />
					<FormSuccess message={success} />
					<Button className="w-full" disabled={isPending} type="submit">
						{showTwoFactor ? "Confirmar" : "Iniciar sesión"}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
