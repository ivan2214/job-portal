export function formatDate(date: Date): string {
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(date);
}

export const mockEmployer = {
	id: "1",
	companyName: "TechCorp Solutions",
	email: "contact@techcorp.com",
	dateJoined: new Date("2022-03-15"),
	totalJobsPosted: 27,
	status: "Active",
};

export const mockJobs = [
	{
		id: "1",
		title: "Senior Software Engineer",
		datePosted: new Date("2023-11-01"),
		status: "Active",
	},
	{
		id: "2",
		title: "Product Manager",
		datePosted: new Date("2023-10-15"),
		status: "Closed",
	},
	{
		id: "3",
		title: "UX Designer",
		datePosted: new Date("2023-11-10"),
		status: "Active",
	},
	// Add more mock jobs as needed
];
