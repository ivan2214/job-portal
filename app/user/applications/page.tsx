import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/db";
import Link from "next/link";
import { FiltersApplications } from "./components/filters-applications";
import { auth } from "@/auth";

export default async function Dashboard() {
	const session = await auth();
	const userId = session?.user?.id;
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		include: {
			applications: {
				include: {
					job: {
						include: {
							company: true,
						},
					},
				},
			},
		},
	});

	if (!user) {
		throw new Error("User not found");
	}

	const { applications } = user;

	return (
		<Container>
			<h1 className="mb-6 font-bold text-2xl">Job Application Dashboard</h1>

			<FiltersApplications />

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{applications.length ? (
					applications?.map((application) => (
						<Card key={application.id}>
							<CardHeader>
								<CardTitle>{application.job.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-sm">
									{application.job.company?.name}
								</p>
								<p className="text-muted-foreground text-sm">
									Applied: {application.createdAt.toLocaleDateString()}
								</p>
							</CardContent>
							<CardFooter className="flex justify-between">
								<Badge
									variant={
										application.status === "ACCEPTED"
											? "success"
											: application.status === "PENDING"
												? "pending"
												: application.status === "REJECTED"
													? "destructive"
													: "default"
									}
								>
									{application.status}
								</Badge>
								<Button asChild size="sm" variant="outline">
									<Link href={`/user/applications/${application.id}`}>
										View Details
									</Link>
								</Button>
							</CardFooter>
						</Card>
					))
				) : (
					<Card>
						<CardHeader>
							<CardTitle>You have no applications</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground text-sm">
								You have no applications yet.
							</p>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button asChild size="sm" variant="outline">
								<Link href="/empleos">Browse Jobs</Link>
							</Button>
						</CardFooter>
					</Card>
				)}
			</div>
		</Container>
	);
}
