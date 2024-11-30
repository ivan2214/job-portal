import type { Company } from "@prisma/client";
import { Briefcase, MapPin } from "lucide-react";
import Link from "next/link";

export default function CompanyCard({
	company,
}: { company: Company & { _count: { jobPostings: number } } }) {
	const openPositions = company._count.jobPostings;
	return (
		<div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
			<div className="mb-4 flex items-center">
				<div className="relative mr-4 h-16 w-16">
					{company.logo ? (
						<img
							src={company.logo}
							alt={`${company.name} logo`}
							className="mr-4 h-16 w-16 rounded-full object-cover"
						/>
					) : (
						<div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 font-bold text-2xl text-gray-500">
							{company.name.charAt(0)}
						</div>
					)}
				</div>
				<div>
					<Link
						href={`/empresas/${company.userId}`}
						className="font-semibold text-xl hover:underline"
					>
						{company.name}
					</Link>
					<p className="mt-1 text-gray-600 text-sm">{company.description}</p>
				</div>
			</div>
			<div className="mb-2 flex items-center text-gray-500 text-sm">
				<MapPin className="mr-1 h-4 w-4" />
				{company.location}
			</div>
			<div className="flex items-center text-gray-500 text-sm">
				<Briefcase className="mr-1 h-4 w-4" />
				{openPositions} Open Position
				{openPositions !== 1 && "s"}
			</div>
		</div>
	);
}
