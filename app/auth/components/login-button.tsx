"use client";

import { useRouter } from "next/navigation";
import type { HTMLAttributes } from "react";

import { LoginForm } from "@/app/auth/components/login-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface LoginButtonProps {
	children: React.ReactNode;
	mode?: "modal" | "redirect";
	asChild?: boolean;
	className?: HTMLAttributes<HTMLSpanElement>["className"];
}

export const LoginButton = ({
	children,
	mode = "redirect",
	asChild,
	className,
}: LoginButtonProps) => {
	const router = useRouter();

	const onClick = () => {
		router.push("/auth/login");
	};

	if (mode === "modal") {
		return (
			<Dialog>
				<DialogTrigger asChild={asChild}>{children}</DialogTrigger>
				<DialogContent className="w-auto border-none bg-transparent p-0">
					<LoginForm />
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
