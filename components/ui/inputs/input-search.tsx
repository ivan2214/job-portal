"use client";
import type React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight, Search } from "lucide-react";
import type { HTMLAttributes } from "react";

interface InputSearchProps {
	label?: string;
	placeholder?: string;
	iconStart?: React.ReactNode;
	iconEnd?: React.ReactNode;
	buttonAriaLabel?: string;
	containerClassName?: HTMLAttributes<HTMLDivElement>["className"];
	inputClassName?: HTMLAttributes<HTMLInputElement>["className"];
	buttonClassName?: HTMLAttributes<HTMLButtonElement>["className"];
	onSubmit?: () => void;
}

const InputSearch: React.FC<InputSearchProps> = ({
	label,
	placeholder = "Search...",
	iconStart = <Search size={16} strokeWidth={2} />,
	iconEnd = <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />,
	buttonAriaLabel = "Submit search",
	containerClassName,
	inputClassName,
	buttonClassName,
	onSubmit,
}) => {
	return (
		<div className={cn("space-y-2", containerClassName)}>
			{label && <Label htmlFor="search-input">{label}</Label>}
			<div className="relative">
				<Input
					id="search-input"
					className={cn("peer ps-9 pe-9", inputClassName)}
					placeholder={placeholder}
					type="search"
				/>
				{iconStart && (
					<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
						{iconStart}
					</div>
				)}
				<button
					className={cn(
						"absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
						buttonClassName,
					)}
					aria-label={buttonAriaLabel}
					type="button"
					onClick={onSubmit}
				>
					{iconEnd}
				</button>
			</div>
		</div>
	);
};

export default InputSearch;
