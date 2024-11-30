"use client";

import {} from "@/components/ui/alert";
import {} from "@/components/ui/radio-group";
import { FormLoginSchema } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

type FormLoginProps = {};

export const FormLogin: React.FC<FormLoginProps> = ({}) => {
	const form = useForm<z.infer<typeof FormLoginSchema>>({
		resolver: zodResolver(FormLoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof FormLoginSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" placeholder="Enter your email" {...field} />
							</FormControl>
							<FormDescription>
								We'll never share your email with anyone else.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder="*******" {...field} />
							</FormControl>
							<FormDescription>
								We'll never share your email with anyone else.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="mt-4 w-full">
					Iniciar Sesión
				</Button>
				<CardFooter className="flex justify-center">
					<Link
						href="/forgot-password"
						className="text-blue-600 text-sm hover:underline"
					>
						¿Olvidaste tu contraseña?
					</Link>
				</CardFooter>
			</form>
		</Form>
	);
};
