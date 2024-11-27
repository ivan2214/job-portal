import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CallToAction() {
	return (
		<Card>
			<CardContent className="flex items-center justify-between p-6">
				<div>
					<h3 className="font-semibold text-2xl">
						Ready for your next opportunity?
					</h3>
					<p className="text-gray-600">
						Explore new job listings and find your perfect match.
					</p>
				</div>
				<Button asChild size="lg">
					<Link href="/user/jobs">Explore Jobs</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
