import type { Job } from "../types/job";

export const jobData: Job = {
	id: "1",
	title: "Senior Frontend Developer",
	company: {
		name: "TechCorp Inc.",
		profileUrl: "https://example.com/techcorp",
	},
	description:
		"We are seeking a skilled Senior Frontend Developer to join our innovative team. The ideal candidate will have extensive experience with React, TypeScript, and modern web technologies. You will be responsible for developing and maintaining high-performance web applications, collaborating with cross-functional teams, and mentoring junior developers.",
	salary: "$120,000 - $150,000 per year",
	location: "San Francisco, CA (Remote option available)",
	applicationStatus: "Pending",
	dateApplied: "2023-11-15",
};

export const relatedJobs: Job[] = [
	{
		id: "2",
		title: "Frontend Developer",
		company: {
			name: "WebSolutions Ltd.",
			profileUrl: "https://example.com/websolutions",
		},
		description:
			"Join our team as a Frontend Developer and work on exciting projects...",
		location: "New York, NY",
		applicationStatus: "Pending",
		dateApplied: "2023-11-10",
	},
	{
		id: "3",
		title: "Full Stack Developer",
		company: {
			name: "InnovateTech",
			profileUrl: "https://example.com/innovatetech",
		},
		description:
			"We re looking for a Full Stack Developer to help build our next-generation platform...",
		salary: "$100,000 - $130,000 per year",
		location: "San Francisco, CA",
		applicationStatus: "Pending",
		dateApplied: "2023-11-12",
	},
];
