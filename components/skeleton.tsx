import { cn } from "@/lib/utils";

interface SkeletonProps {
	className?: string;
	type?: "text" | "image" | "highlight";
}

export function Skeleton({ className, type = "text" }: SkeletonProps) {
	return (
		<div
			className={cn(
				"animate-pulse rounded bg-[length:200%_100%] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200",
				{
					"h-4 w-full": type === "text",
					"h-16 w-16": type === "image",
					"h-32 w-full": type === "highlight",
				},
				className,
			)}
			aria-hidden="true"
		/>
	);
}
