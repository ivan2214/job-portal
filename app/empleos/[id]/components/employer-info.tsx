import { BuildingIcon, MailIcon, PhoneIcon } from "lucide-react";
import type { Company } from "@prisma/client";

export default function EmployerInfo({
	company,
}: {
	company: Company | null;
}) {
	return (
		<div className="rounded-lg bg-white p-6 shadow-md">
			<div className="mb-4 flex items-center">
				{company?.logo && (
					<img
						src={company?.logo}
						alt={`${company.name} logo`}
						className="mr-4 h-16 w-16 rounded-full object-cover"
					/>
				)}
				<h2 className="font-semibold text-2xl">{company?.name}</h2>
			</div>
			<div className="space-y-4">
				<p>{company?.description}</p>
				<div className="flex items-center">
					<MailIcon className="mr-2 h-5 w-5 text-gray-500" />
					<span>{company?.email}</span>
				</div>
				<div className="flex items-center">
					<PhoneIcon className="mr-2 h-5 w-5 text-gray-500" />
					<span>{company?.phone}</span>
				</div>
				<div className="flex items-center">
					<BuildingIcon className="mr-2 h-5 w-5 text-gray-500" />
					<span>{company?.location}</span>
				</div>
			</div>
		</div>
	);
}
