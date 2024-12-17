"use client";
import { Button } from "@/components/ui/button";
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
import { FormNewAdminSchema } from "@/schemas/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { RoleUser } from "@prisma/client";
import { Eye, EyeClosed, PlusCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { addNewAdmin } from "../actions/admin";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

export type newAdmin = {
	name: string;
	email: string;
	role: string;
};

export function AddAdminModal() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [viewDialog, setViewDialog] = useState(false);
	const form = useForm<z.infer<typeof FormNewAdminSchema>>({
		resolver: zodResolver(FormNewAdminSchema),
		defaultValues: {
			name: "",
			email: "",
			image: "",
			password: "",
			confirmPassword: "",
			role: RoleUser.ADMIN,
		},
	});

	const [isPending, startTransition] = useTransition();

	const onSubmit = (values: z.infer<typeof FormNewAdminSchema>) => {
		startTransition(() => {
			addNewAdmin(values)
				.then((data) => {
					if (data.error) {
						toast.error(data.error);
					}
					if (data.message) {
						toast.success(data.message);
					}
				})
				.finally(() => {
					form.reset();
					toast.dismiss();
					setViewDialog(false);
				});
		});
	};

	return (
		<Dialog open={viewDialog} onOpenChange={setViewDialog}>
			<DialogTrigger asChild>
				<Button>
					<PlusCircle className="mr-2 h-4 w-4" /> Add New Admin
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New Admin</DialogTitle>
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

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<div className="flex items-center justify-between gap-x-2">
											<Input
												type={showPassword ? "text" : "password"}
												placeholder="********"
												{...field}
											/>
											<Button
												type="button"
												onClick={() => setShowPassword(!showPassword)}
												className=""
												size="sm"
											>
												{!showPassword ? <Eye /> : <EyeClosed />}
											</Button>
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
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<div className="flex items-center justify-between gap-x-2">
											<Input
												type={showConfirmPassword ? "text" : "password"}
												placeholder="********"
												{...field}
											/>
											<Button
												type="button"
												onClick={() =>
													setShowConfirmPassword(!showConfirmPassword)
												}
												className=""
												size="sm"
											>
												{!showConfirmPassword ? <Eye /> : <EyeClosed />}
											</Button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button type="submit">Add Admin</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
