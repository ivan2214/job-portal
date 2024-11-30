import { Plus, Users } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CallToAction() {
	return (
		<div className="grid gap-4 md:grid-cols-2">
			<Card>
				<CardContent className="pt-6">
					<Button asChild className="w-full">
						<Link
							href="/company/jobs/new"
							className="flex items-center justify-center"
						>
							<Plus className="mr-2 h-4 w-4" />
							Post a New Job
						</Link>
					</Button>
				</CardContent>
			</Card>
			<Card>
				<CardContent className="pt-6">
					<Button asChild variant="secondary" className="w-full">
						<Link
							href="/company/applications"
							className="flex items-center justify-center"
						>
							<Users className="mr-2 h-4 w-4" />
							View All Applications
						</Link>
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
