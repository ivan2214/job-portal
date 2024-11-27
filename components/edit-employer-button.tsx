"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Employer {
	id: string;
	companyName: string;
	email: string;
}

export default function EditEmployerButton({
	employer,
}: { employer: Employer }) {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		companyName: employer.companyName,
		email: employer.email,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		// Here you would typically call an API to update the employer information
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API call
		setIsLoading(false);
		setIsOpen(false);
		// You might want to show a success message or update the UI here
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Edit Employer Information</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Employer Information</DialogTitle>
					<DialogDescription>
						Make changes to the employer's information here. Click save when
						you're done.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="companyName" className="text-right">
								Company Name
							</Label>
							<Input
								id="companyName"
								name="companyName"
								value={formData.companyName}
								onChange={handleChange}
								className="col-span-3"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="email" className="text-right">
								Email
							</Label>
							<Input
								id="email"
								name="email"
								type="email"
								value={formData.email}
								onChange={handleChange}
								className="col-span-3"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? "Saving..." : "Save changes"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
