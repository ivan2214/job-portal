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

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { FormChangeUserStatusSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { type User, UserStatus } from "@prisma/client";
import { Loader2, Pencil } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { changeUserStatus } from "../../actions/user";

interface UserAdminButtonChangeStatusProps {
	id: string;
	user: User;
	redirectUrl?: string;
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

export const UserAdminButtonChangeStatus: React.FC<
	UserAdminButtonChangeStatusProps
> = ({ id, user, redirectUrl }) => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof FormChangeUserStatusSchema>>({
		resolver: zodResolver(FormChangeUserStatusSchema),
		defaultValues: {
			status: user.status,
			id,
		},
	});

	const onSubmit = async (
		values: z.infer<typeof FormChangeUserStatusSchema>,
	) => {
		startTransition(() => {
			changeUserStatus(values, redirectUrl).then((data) => {
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
				<Button size="sm" className="bg-blue-600">
					<Pencil className="mr-2 h-4 w-4" size={20} />
					Change Status user
				</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
				<DialogHeader className="contents space-y-0 text-left">
					<DialogTitle className="border-border border-b px-6 py-4 text-base">
						Change Status
					</DialogTitle>
					<DialogDescription className="sr-only">
						Change Status user {user.name}
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="max-h-[80vh] space-y-4 overflow-y-auto px-6 pt-4 pb-6"
					>
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
