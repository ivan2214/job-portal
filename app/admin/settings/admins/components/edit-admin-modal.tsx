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

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {} from "@/components/ui/select";
import { FormEditAdminSchema } from "@/schemas/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { RoleUser, type User } from "@prisma/client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { editAdmin } from "../actions/admin";
import { Pencil } from "lucide-react";

interface EditAdminModalProps {
	admin: User;
}

export function EditAdminModal({ admin }: EditAdminModalProps) {
	const [isOpen, setIsOpen] = useState(false);

	const form = useForm<z.infer<typeof FormEditAdminSchema>>({
		resolver: zodResolver(FormEditAdminSchema),
		defaultValues: {
			id: admin.id || "",
			name: admin.name || "",
			email: admin.email || "",
			image: admin.image || "",

			role: RoleUser.ADMIN,
		},
	});

	const [isPending, startTransition] = useTransition();

	const onSubmit = (values: z.infer<typeof FormEditAdminSchema>) => {
		startTransition(() => {
			editAdmin(values)
				.then((data) => {
					if (data.error) {
						toast.error(data.error);
					}
					if (data.success) {
						toast.success(data.success);
					}
				})
				.finally(() => {
					form.reset();
					toast.dismiss();
					setIsOpen(false);
				});
		});
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					<Pencil className="mr-2 h-4 w-4" /> Edit
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Admin</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Admin 1" {...field} />
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
										<Input
											type="email"
											placeholder="X6k0H@example.com"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button
								type="button"
								onClick={() => {
									form.reset();
									setIsOpen(false);
								}}
							>
								Cancel
							</Button>
							<Button type="submit">Edit</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
