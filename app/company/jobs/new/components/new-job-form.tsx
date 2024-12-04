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
import { TypeJob, type CategoryJob } from "@prisma/client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { newJob } from "../../actions/new-job";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Container } from "@/components/container";
import { Switch } from "@/components/ui/switch";

type NewJobFormProps = {
	categoriesJobs: CategoryJob[] | null;
};

const typesJobs: TypeJob[] = [
	TypeJob.CONTRACT,
	TypeJob.FULL_TIME,
	TypeJob.INTERN,
	TypeJob.OTHER,
	TypeJob.PART_TIME,
	TypeJob.PERMANENT,
	TypeJob.TEMPORARY,
	TypeJob.VOLUNTARY,
];

export const NewJobForm: React.FC<NewJobFormProps> = ({ categoriesJobs }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();
	const [addContactInfo, setAddContactInfo] = useState(false);

	const form = useForm<z.infer<typeof NewJobSchema>>({
		resolver: zodResolver(NewJobSchema),
		defaultValues: {
			category: "",
			contactInfo: {
				email: "",
				phone: "",
				website: "",
				facebook: "",
				instagram: "",
				linkedin: "",
			},
			description: "",
			location: "",
			requirements: [],
			salary: "",
			title: "",
			type: TypeJob.OTHER,
		},
	});

	const onSubmit = (values: z.infer<typeof NewJobSchema>) => {
		setError("");
		setSuccess("");
		console.log({
			values,
		});

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

	const handleAddContactInfo = () => {
		setAddContactInfo(!addContactInfo);
	};

	console.log(addContactInfo);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="mx-auto max-w-screen-xl space-y-8 rounded bg-white p-6"
			>
				<FormField
					control={form.control}
					name="title"
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
					name="description"
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
					name="category"
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
					name="location"
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
					name="salary"
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
					name="requirements"
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
				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel>Tipo de trabajo</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className="flex flex-col space-y-1"
								>
									{typesJobs.map((type) => (
										<FormItem
											key={type}
											className="flex items-center space-x-3 space-y-0"
										>
											<FormControl>
												<RadioGroupItem value={type} />
											</FormControl>
											<FormLabel className="font-normal">{type}</FormLabel>
										</FormItem>
									))}
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex items-center space-x-2">
					<Switch
						checked={addContactInfo}
						onCheckedChange={handleAddContactInfo}
						id="contactInfo"
					/>
					<Label htmlFor="contactInfo">Agregar información de contacto</Label>
				</div>

				{addContactInfo && (
					<Container className="space-y-4 rounded border">
						<FormField
							control={form.control}
							name="contactInfo.email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email de contacto</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="Ej: 6eDl2@example.com"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Proporcione un correo electrónica de contacto.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="contactInfo.facebook"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Facebook</FormLabel>
									<FormControl>
										<Input
											type="url"
											placeholder="Ej: https://www.facebook.com/"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Proporcione la URL de su perfil de Facebook.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="contactInfo.linkedin"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Linkedin</FormLabel>
									<FormControl>
										<Input
											type="url"
											placeholder="Ej: https://www.linkedin.com/"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Proporcione la URL de su perfil de LinkedIn.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="contactInfo.instagram"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Instagram</FormLabel>
									<FormControl>
										<Input
											type="url"
											placeholder="Ej: https://www.instagram.com/"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Proporcione la URL de su perfil de Instagram.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="contactInfo.phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tel&eacute;fono</FormLabel>
									<FormControl>
										<Input
											type="tel"
											placeholder="Ej: +34 123 456 789"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Proporcione un tel&eacute;fono de contacto.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="contactInfo.website"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Website</FormLabel>
									<FormControl>
										<Input
											type="url"
											placeholder="Ej: https://www.example.com/"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Proporcione la URL de su sitio web.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</Container>
				)}

				<FormError message={error} />
				<FormSuccess message={success} />
				<Button type="submit" disabled={isSubmitting || isPending}>
					{isSubmitting || isPending
						? "Creando oferta..."
						: "Crear oferta de empleo"}
				</Button>
			</form>
		</Form>
	);
};
