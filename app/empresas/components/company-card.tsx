import Image from "next/image";
import Link from "next/link";
import { MapPin, Briefcase } from "lucide-react";

interface Company {
	id: string;
	name: string;
	description: string;
	location: string;
	openPositions: number;
	logo?: string;
}

export default function CompanyCard({ company }: { company: Company }) {
	return (
		<div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
			<div className="mb-4 flex items-center">
				<div className="relative mr-4 h-16 w-16">
					{company.logo ? (
						<Image
							src={company.logo}
							alt={`${company.name} logo`}
							fill
							className="rounded-full object-cover"
						/>
					) : (
						<div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 font-bold text-2xl text-gray-500">
							{company.name.charAt(0)}
						</div>
					)}
				</div>
				<div>
					<Link
						href={`/empresas/${company.id}`}
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
				{company.openPositions} Open Position
				{company.openPositions !== 1 && "s"}
			</div>
		</div>
	);
}
