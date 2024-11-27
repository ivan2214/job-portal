export interface Job {
	id: string;
	title: string;
	company: string;
	location: string;
	status: "Pending" | "Accepted" | "Rejected";
}

export const mockJobs: Job[] = [
	{
		id: "1",
		title: "Frontend Developer",
		company: "TechCorp",
		location: "New York",
		status: "Pending",
	},
	{
		id: "2",
		title: "Backend Engineer",
		company: "DataSys",
		location: "San Francisco",
		status: "Accepted",
	},
	{
		id: "3",
		title: "UX Designer",
		company: "DesignHub",
		location: "London",
		status: "Rejected",
	},
	{
		id: "4",
		title: "Data Scientist",
		company: "AITech",
		location: "Berlin",
		status: "Pending",
	},
	{
		id: "5",
		title: "Product Manager",
		company: "InnovateCo",
		location: "Tokyo",
		status: "Accepted",
	},
];
