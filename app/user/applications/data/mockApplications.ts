export type ApplicationStatus = "Pending" | "Accepted" | "Rejected";

export interface JobApplication {
	id: string;
	jobTitle: string;
	company: string;
	status: ApplicationStatus;
	appliedDate: string;
}

export const mockApplications: JobApplication[] = [
	{
		id: "1",
		jobTitle: "Frontend Developer",
		company: "TechCorp",
		status: "Pending",
		appliedDate: "2023-05-15",
	},
	{
		id: "2",
		jobTitle: "UX Designer",
		company: "DesignHub",
		status: "Accepted",
		appliedDate: "2023-05-10",
	},
	{
		id: "3",
		jobTitle: "Data Analyst",
		company: "DataWise",
		status: "Rejected",
		appliedDate: "2023-05-05",
	},
	{
		id: "4",
		jobTitle: "Product Manager",
		company: "InnovateCo",
		status: "Pending",
		appliedDate: "2023-05-20",
	},
	{
		id: "5",
		jobTitle: "Backend Engineer",
		company: "ServerSolutions",
		status: "Pending",
		appliedDate: "2023-05-18",
	},
];
