"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

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

import { useTransition } from "react";
import { editUser } from "../actions/user";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { FormEditUserSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { UserStatus, type User } from "@prisma/client";
import { Loader2, Pencil } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface UserAdminButtonEditProps {
	user: User;
}

const statuses = [
	UserStatus.ACTIVE,
	UserStatus.BANNED,
	UserStatus.BLOCKED,
	UserStatus.DEACTIVATED,
	UserStatus.DEACTIVATED_BY_ADMIN,
	UserStatus.DEACTIVATED_PERMANENTLY,
	UserStatus.DEACTIVATED_TEMPORARILY,
	UserStatus.DELETED,
	UserStatus.INACTIVE,
	UserStatus.SUSPENDED,
];

export const UserAdminButtonEdit: React.FC<UserAdminButtonEditProps> = ({
	user,
}) => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof FormEditUserSchema>>({
		resolver: zodResolver(FormEditUserSchema),
		defaultValues: {
			name: user.name || "",
			email: user.email || "",
			emailVerified: !!user.emailVerified,

			status: user.status || "",
		},
	});

	const onSubmit = async (values: z.infer<typeof FormEditUserSchema>) => {
		startTransition(() => {
			editUser(values).then((data) => {
				if (data.error) {
					toast.error(data.error);
				}
				if (data.success) {
					toast.success(data.success);
				}
			});
		});
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm" className="">
					<Pencil className="mr-2 h-4 w-4" size={20} />
					Editar
				</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
				<DialogHeader className="contents space-y-0 text-left">
					<DialogTitle className="border-border border-b px-6 py-4 text-base">
						Edit user
					</DialogTitle>
					<DialogDescription className="sr-only">
						Make changes to your profile here. You can change your photo and set
						a username.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="max-h-[80vh] space-y-4 overflow-y-auto px-6 pt-4 pb-6"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="shadcn" {...field} />
									</FormControl>
									<FormDescription>This is user name</FormDescription>
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
										<Input type="email" placeholder="shadcn" {...field} />
									</FormControl>
									<FormDescription>This is user email</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="emailVerified"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<FormLabel className="text-base">Email Verified</FormLabel>
										<FormDescription>
											Active if email is verified
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
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
											{statuses?.map((status) => (
												<SelectItem key={status} value={status}>
													{status}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>Select user status</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter className="border-border border-t py-4">
							<DialogClose asChild>
								<Button type="reset" variant="outline">
									Cancel
								</Button>
							</DialogClose>
							<DialogClose asChild>
								<Button type="submit" disabled={isPending}>
									{isPending && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									Save changes
								</Button>
							</DialogClose>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
