import { Container } from "@/components/container";
import { prisma } from "@/db";
import type { Job } from "@prisma/client";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JobPosting } from "./components/job-posting";

export default async function CompanyProfile({
	params,
}: { params: { id: string } }) {
	const { id } = await params;
	const company = await prisma.company.findUnique({
		where: {
			id: id,
		},
		include: {
			jobPostings: {
				include: {
					categoryJob: true,
					company: true,
				},
			},
		},
	});

	if (!company) {
		notFound();
	}

	return (
		<Container>
			<Link
				href="/empresas"
				className="mb-6 flex items-center text-blue-600 hover:underline"
			>
				<ArrowLeft className="mr-2 h-4 w-4" />
				Back to Companies
			</Link>

			<div className="grid gap-8 md:grid-cols-3">
				<div className="md:col-span-2">
					<div className="mb-6 flex items-center">
						{company?.logo ? (
							<img
								src={company?.logo}
								alt={`${company?.name} logo`}
								width={100}
								height={100}
								className="mr-4 h-16 w-16 rounded-full object-cover"
							/>
						) : (
							<div className="mr-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 font-bold text-2xl text-gray-500">
								{company?.name.charAt(0)}
							</div>
						)}
						<h1 className="font-bold text-4xl">{company?.name}</h1>
					</div>

					<div className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl">About Us</h2>
						<p className="text-gray-700">{company?.description}</p>
					</div>

					<div className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl">Contact Information</h2>
						<div className="space-y-2">
							<div className="flex items-center">
								<MapPin className="mr-2 h-5 w-5 text-gray-500" />
								<span>{company?.location}</span>
							</div>

							{company?.phone && (
								<div className="flex items-center">
									<Phone className="mr-2 h-5 w-5 text-gray-500" />
									<span>{company?.phone}</span>
								</div>
							)}
							{company?.email && (
								<div className="flex items-center">
									<Mail className="mr-2 h-5 w-5 text-gray-500" />
									<span>{company?.email}</span>
								</div>
							)}
						</div>
					</div>
				</div>

				<div>
					<h2 className="mb-4 font-semibold text-2xl">Job Postings</h2>
					<div className="space-y-4">
						{company?.jobPostings.length > 0 &&
							company?.jobPostings?.map((job: Job) => (
								<JobPosting key={job.id} job={job} />
							))}
					</div>
				</div>
			</div>
		</Container>
	);
}
