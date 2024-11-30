"use client";

import {} from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormRegisterSchema } from "@/schemas/auth-schema";
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
import { toast } from "sonner";

type FormRegisterProps = {};

export const FormRegister: React.FC<FormRegisterProps> = ({}) => {
	const form = useForm<z.infer<typeof FormRegisterSchema>>({
		resolver: zodResolver(FormRegisterSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
			name: "",
			role: "postulante",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof FormRegisterSchema>) {
		toast("You submitted the following values:", {
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(values, null, 2)}</code>
				</pre>
			),
		});
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full name</FormLabel>
							<FormControl>
								<Input placeholder="John Doe" {...field} />
							</FormControl>
							<FormDescription>
								This is your public display name.
							</FormDescription>
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
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
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

				<FormField
					control={form.control}
					name="role"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel>Notify me about...</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className="flex flex-col space-y-1"
								>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="postulante" />
										</FormControl>
										<FormLabel className="font-normal">Postulante</FormLabel>
									</FormItem>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="empleador" />
										</FormControl>
										<FormLabel className="font-normal">Empleador</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="mt-4 w-full">
					Iniciar Sesión
				</Button>
				<CardFooter className="flex justify-center">
					<Link
						href="/auth?type=login"
						className="text-blue-600 text-sm hover:underline"
					>
						Ya tienes una cuenta? Inicia Sesión
					</Link>
				</CardFooter>
			</form>
		</Form>
	);
};
