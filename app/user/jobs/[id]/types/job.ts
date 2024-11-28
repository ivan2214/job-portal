export interface Job {
	id: string;
	title: string;
	company: {
		name: string;
		profileUrl: string;
	};
	description: string;
	salary?: string;
	location: string;
	applicationStatus: "Pending" | "Reviewed" | "Rejected" | "Accepted";
	dateApplied: string;
}

export interface JobApplicationProps {
	job: Job;
	onWithdraw: (jobId: string) => void;
	onBack: () => void;
}
