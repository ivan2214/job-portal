import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, FileText } from "lucide-react";

interface ApplicantCardProps {
	applicant: {
		name: string;
		email: string;
		resumeLink: string;
	};
}

export function ApplicantCard({ applicant }: ApplicantCardProps) {
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
							href={applicant.resumeLink}
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
