import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ApplicationActions from "./components/application-actions";
import MessageThread from "./components/message-thread";
import { prisma } from "@/db";
import { Container } from "@/components/container";
import { BreadcrumbDynamic } from "@/components/breadcrumbs-dynamic";

type Params = Promise<{ id: string }>;

export default async function ApplicationDetailsPage({
	params,
}: { params: Params }) {
	const { id } = await params;
	const application = await prisma.application.findUnique({
		where: {
			id: id,
		},
		include: {
			job: true,
			user: true,
		},
	});

	if (!application) {
		notFound();
	}

	return (
		<Container>
			<BreadcrumbDynamic
				items={[
					{
						label: "Applications",
						href: "/admin/applications",
					},
					{
						label: application.job.title,
						href: `/admin/jobs/${application.job.id}`,
					},
				]}
			/>
			<h1 className="mb-6 font-bold text-3xl">
				Application Details for {application.job.title}
			</h1>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				<div className="md:col-span-2">
					<Card>
						<CardHeader>
							<CardTitle>Applicant Information</CardTitle>
						</CardHeader>
						<CardContent>
							<dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div>
									<dt className="font-medium text-gray-500">Full Name</dt>
									<dd>{application.user.name}</dd>
								</div>
								<div>
									<dt className="font-medium text-gray-500">Email</dt>
									<dd>{application.user.email}</dd>
								</div>
								<div>
									<dt className="font-medium text-gray-500">
										Application Date
									</dt>
									<dd>{application.dateApplied.toLocaleDateString()}</dd>
								</div>
								<div>
									<dt className="font-medium text-gray-500">Status</dt>
									<dd>
										<Badge
											variant={
												application.status === "PENDING"
													? "pending"
													: application.status === "ACCEPTED"
														? "success"
														: application.status === "REJECTED"
															? "destructive"
															: "default"
											}
										>
											{application.status}
										</Badge>
									</dd>
								</div>
							</dl>
							{/* 	{application.resumeUrl && (
								<div className="mt-4">
									<Link
										href={application.resumeUrl}
										className="text-blue-600 hover:underline"
									>
										View Resume
									</Link>
								</div>
							)} */}
						</CardContent>
					</Card>

					<Card className="mt-6">
						<CardHeader>
							<CardTitle>Cover Letter</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="whitespace-pre-wrap">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Incidunt ratione totam ipsa omnis quis repellendus iusto eaque
								atque debitis? Nesciunt ipsum ab in beatae temporibus labore
								quasi possimus dolorum excepturi.
								{/* {application.coverLetter} */}
							</p>
						</CardContent>
					</Card>

					<Card className="mt-6">
						<CardHeader>
							<CardTitle>Message Thread</CardTitle>
						</CardHeader>
						<CardContent>
							<MessageThread applicationId={application.id} />
						</CardContent>
					</Card>
				</div>

				<div>
					<Card>
						<CardHeader>
							<CardTitle>Job Information</CardTitle>
						</CardHeader>
						<CardContent>
							<h3 className="mb-2 font-semibold text-lg">
								<Link
									href={`/admin/jobs/${application.jobId}`}
									className="tembl2-600 hover:undetextilge"
								>
									{application.job.title}
								</Link>
							</h3>
							<p className="mb-2">{application.job.description}</p>
							<p className="mb-2">
								<strong>Location:</strong> {application.job.location}
							</p>
							<p>
								<strong>Salary Range:</strong> {application.job.salary}
							</p>
						</CardContent>
					</Card>

					<Card className="mt-6">
						<CardHeader>
							<CardTitle>Application Actions</CardTitle>
						</CardHeader>
						<CardContent>
							<ApplicationActions
								applicationId={application.id}
								currentStatus={application.status}
							/>
						</CardContent>
					</Card>
				</div>
			</div>
		</Container>
	);
}
