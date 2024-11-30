"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { CardWrapper } from "./card-wrapper";

import { register } from "@/actions/register";
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
import { FormRegisterSchema } from "@/schemas/auth-schema";

export const RegisterForm = () => {
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();

	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		useState<boolean>(false);

	const form = useForm<z.infer<typeof FormRegisterSchema>>({
		resolver: zodResolver(FormRegisterSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
			fullName: "",
		},
	});

	const onSubmit = (values: z.infer<typeof FormRegisterSchema>) => {
		setError("");
		setSuccess("");
		startTransition(() => {
			register(values).then((data) => {
				setError(data.error);
				setSuccess(data.success);
			});
		});
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const toggleShowConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	return (
		<CardWrapper
			showSocial
			backButtonHref="/auth/login"
			backButtonLabel="Ya tienes una cuenta?"
			headderLabel="Crea una cuenta"
		>
			<Form {...form}>
				<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="fullName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nombre completo</FormLabel>
								<FormControl>
									<Input {...field} disabled={isPending} placeholder="jonny" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

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
									<div className="flex items-center justify-between gap-x-2">
										<Input
											{...field}
											disabled={isPending}
											placeholder="********"
											type={showPassword ? "text" : "password"}
										/>
										{showPassword ? (
											<EyeOffIcon onClick={toggleShowPassword} />
										) : (
											<EyeIcon onClick={toggleShowPassword} />
										)}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirmar contraseña</FormLabel>
								<FormControl>
									<div className="flex items-center justify-between gap-x-2">
										<Input
											{...field}
											disabled={isPending}
											placeholder="********"
											type={showConfirmPassword ? "text" : "password"}
										/>
										{showConfirmPassword ? (
											<EyeOffIcon onClick={toggleShowConfirmPassword} />
										) : (
											<EyeIcon onClick={toggleShowConfirmPassword} />
										)}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormError message={error} />
					<FormSuccess message={success} />
					<Button className="w-full" disabled={isPending} type="submit">
						Crear cuenta
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
