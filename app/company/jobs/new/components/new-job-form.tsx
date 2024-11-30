"use client";

import { Button } from "@/components/ui/button";
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
import { InputWithTags } from "@/components/ui/inputs/input-with-tags";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { NewJobSchema } from "@/schemas/job-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CategoryJob } from "@prisma/client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { newJob } from "../../actions/new-job";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

type NewJobFormProps = {
	categoriesJobs: CategoryJob[] | null;
};

export const NewJobForm: React.FC<NewJobFormProps> = ({ categoriesJobs }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof NewJobSchema>>({
		resolver: zodResolver(NewJobSchema),
		defaultValues: {
			titulo: "",
			descripcion: "",
			categoria: "",
			ubicacion: "",
			salario: "",
			requisitos: [],
		},
	});

	const onSubmit = (values: z.infer<typeof NewJobSchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			newJob(values)
				.then((data) => {
					if (data?.error) {
						form.reset();
						setError(data?.error);
					}
					if (data?.success) {
						form.reset();
						setSuccess(data?.success);
					}
				})
				.catch((e) => setError(e.message));
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="mx-auto max-w-screen-xl space-y-8 rounded bg-white p-6"
			>
				<FormField
					control={form.control}
					name="titulo"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Título del puesto</FormLabel>
							<FormControl>
								<Input
									placeholder="Ej: Desarrollador Full Stack Senior"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Ingrese un título claro y conciso para la oferta de empleo.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="descripcion"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Descripción del puesto</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Describa las responsabilidades y tareas principales del puesto..."
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Proporcione una descripción detallada del puesto y las
								responsabilidades asociadas.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="categoria"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Categoría</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Seleccione una categoría" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{categoriesJobs?.map((category) => (
										<SelectItem key={category.id} value={category.id}>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>
								Elija la categoría que mejor se ajuste al puesto ofrecido.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="ubicacion"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ubicación</FormLabel>
							<FormControl>
								<Input placeholder="Ej: Madrid, España" {...field} />
							</FormControl>
							<FormDescription>
								Indique la ubicación del puesto (ciudad, país o remoto).
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="salario"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Salario anual (€)</FormLabel>
							<FormControl>
								<Input type="number" placeholder="Ej: 50000" {...field} />
							</FormControl>
							<FormDescription>
								Ingrese el salario anual en euros (solo números).
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="requisitos"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Requisitos</FormLabel>
							<FormControl>
								<InputWithTags tags={field.value} setTags={field.onChange} />
							</FormControl>
							<FormDescription>
								Detalle los requisitos, habilidades y experiencia necesarios
								para el puesto.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormError message={error} />
				<FormSuccess message={success} />
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Creando oferta..." : "Crear oferta de empleo"}
				</Button>
			</form>
		</Form>
	);
};
