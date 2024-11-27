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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
	titulo: z.string().min(5, {
		message: "El título debe tener al menos 5 caracteres.",
	}),
	descripcion: z.string().min(50, {
		message: "La descripción debe tener al menos 50 caracteres.",
	}),
	categoria: z.string({
		required_error: "Por favor seleccione una categoría.",
	}),
	ubicacion: z.string().min(3, {
		message: "Por favor ingrese una ubicación válida.",
	}),
	salario: z.string().regex(/^\d+$/, {
		message: "Por favor ingrese un salario válido (solo números).",
	}),
	requisitos: z.string().min(20, {
		message: "Los requisitos deben tener al menos 20 caracteres.",
	}),
});

export default function CrearOfertaPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			titulo: "",
			descripcion: "",
			categoria: "",
			ubicacion: "",
			salario: "",
			requisitos: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		setIsSubmitting(true);
		// Aquí iría la lógica para enviar los datos al servidor
		console.log(values);
		setTimeout(() => {
			setIsSubmitting(false);
			form.reset();
			alert("Oferta de empleo creada con éxito!");
		}, 2000);
	}

	return (
		<div className="container mx-auto py-10">
			<h1 className="mb-6 font-bold text-3xl">Crear Nueva Oferta de Empleo</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Seleccione una categoría" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="tecnologia">Tecnología</SelectItem>
										<SelectItem value="marketing">Marketing</SelectItem>
										<SelectItem value="ventas">Ventas</SelectItem>
										<SelectItem value="finanzas">Finanzas</SelectItem>
										<SelectItem value="rrhh">Recursos Humanos</SelectItem>
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
									<Textarea
										placeholder="Liste los requisitos necesarios para el puesto..."
										className="resize-none"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Detalle los requisitos, habilidades y experiencia necesarios
									para el puesto.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Creando oferta..." : "Crear oferta de empleo"}
					</Button>
				</form>
			</Form>
		</div>
	);
}
