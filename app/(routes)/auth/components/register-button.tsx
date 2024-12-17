"use client";

import { useRouter } from "next/navigation";
import type { HTMLAttributes } from "react";

import { RegisterForm } from "@/app/(routes)/auth/components/register-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface RegisterButtonProps {
	children: React.ReactNode;
	mode?: "modal" | "redirect";
	asChild?: boolean;
	className?: HTMLAttributes<HTMLSpanElement>["className"];
}

export const RegisterButton = ({
	children,
	mode = "redirect",
	asChild,
	className,
}: RegisterButtonProps) => {
	const router = useRouter();

	const onClick = () => {
		router.push("/auth/register");
	};

	if (mode === "modal") {
		return (
			<Dialog>
				<DialogTrigger asChild={asChild}>{children}</DialogTrigger>
				<DialogContent className="w-auto border-none bg-transparent p-0">
					<RegisterForm />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Button className={cn("cursor-pointer", className)} onClick={onClick}>
			{children}
		</Button>
	);
};
