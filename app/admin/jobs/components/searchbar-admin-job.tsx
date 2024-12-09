"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export function SearchBarAdminJob() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const formData = new FormData(form);
		const query = formData.get("query")?.toString() || "";

		startTransition(() => {
			const params = new URLSearchParams(searchParams);
			if (query) {
				params.set("query", query);
			} else {
				params.delete("query");
			}
			params.set("page", "1");
			router.push(`/admin/jobs?${params.toString()}`);
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex w-full max-w-sm items-center space-x-2"
		>
			<Input
				type="text"
				name="query"
				placeholder="Search users..."
				defaultValue={searchParams.get("query")?.toString()}
			/>
			<Button type="submit" size="icon" disabled={isPending}>
				<Search className="h-4 w-4" />
				<span className="sr-only">Search</span>
			</Button>
		</form>
	);
}
