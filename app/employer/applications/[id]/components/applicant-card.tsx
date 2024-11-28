import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User as PrismaUser } from "@prisma/client";
import { FileText, Mail, User } from "lucide-react";

export function ApplicantCard({
	applicant,
}: {
	applicant: PrismaUser;
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Applicant Details</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div className="flex items-center space-x-2">
						<User className="h-5 w-5 text-muted-foreground" />
						<span>{applicant.name}</span>
					</div>
					<div className="flex items-center space-x-2">
						<Mail className="h-5 w-5 text-muted-foreground" />
						<a
							href={`mailto:${applicant.email}`}
							className="text-blue-600 hover:underline"
						>
							{applicant.email}
						</a>
					</div>
					<div className="flex items-center space-x-2">
						<FileText className="h-5 w-5 text-muted-foreground" />
						<a
							href={`resumens/${applicant.name}.pdf`}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 hover:underline"
						>
							View Resume
						</a>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
