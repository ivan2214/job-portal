import type { Job } from "@/app/user/jobs/[id]/types/job";

interface Company {
	id: string;
	name: string;
	description: string;
	location: string;
	openPositions: number;
	logo?: string;
	phone?: string;
	email?: string;
	jobPostings?: Job[];
}

const mockCompanies: Company[] = [
	{
		id: "1",
		name: "TechCorp",
		description: "Leading innovation in software development",
		location: "San Francisco, CA",
		openPositions: 5,
		logo: "https://picsum.photos/700/400?ramdom",
		phone: "+1-415-555-1234",
		email: "contact@techcorp.com",
		jobPostings: [
			{
				id: "101",
				title: "Frontend Developer",
				company: {
					name: "TechCorp",
					profileUrl: "/companies/techcorp",
				},
				description:
					"Develop and maintain user-facing features for our platforms.",
				salary: "$85,000 - $100,000",
				location: "San Francisco, CA",
				applicationStatus: "Pending",
				dateApplied: "2024-11-20",
			},
			{
				id: "102",
				title: "Backend Developer",
				company: {
					name: "TechCorp",
					profileUrl: "/companies/techcorp",
				},
				description: "Work on server-side logic and database structures.",
				salary: "$95,000 - $115,000",
				location: "San Francisco, CA",
				applicationStatus: "Reviewed",
				dateApplied: "2024-11-15",
			},
		],
	},
	{
		id: "2",
		name: "GreenEnergy",
		description: "Sustainable energy solutions for a better future",
		location: "Austin, TX",
		openPositions: 3,
		logo: "https://picsum.photos/700/400?ramdom",
		phone: "+1-512-555-5678",
		email: "info@greenenergy.com",
		jobPostings: [
			{
				id: "201",
				title: "Project Manager",
				company: {
					name: "GreenEnergy",
					profileUrl: "/companies/greenenergy",
				},
				description: "Manage renewable energy projects from start to finish.",
				salary: "$70,000 - $90,000",
				location: "Austin, TX",
				applicationStatus: "Accepted",
				dateApplied: "2024-11-10",
			},
		],
	},
	{
		id: "3",
		name: "HealthTech",
		description: "Revolutionizing healthcare with cutting-edge technology",
		location: "Boston, MA",
		openPositions: 7,
		logo: "https://picsum.photos/700/400?ramdom",
		phone: "+1-617-555-9012",
		email: "careers@healthtech.com",
		jobPostings: [
			{
				id: "301",
				title: "Data Scientist",
				company: {
					name: "HealthTech",
					profileUrl: "/companies/healthtech",
				},
				description: "Analyze healthcare data to derive actionable insights.",
				salary: "$110,000 - $130,000",
				location: "Boston, MA",
				applicationStatus: "Rejected",
				dateApplied: "2024-11-18",
			},
			{
				id: "302",
				title: "Product Manager",
				company: {
					name: "HealthTech",
					profileUrl: "/companies/healthtech",
				},
				description: "Lead the development of innovative healthcare products.",
				location: "Boston, MA",
				applicationStatus: "Pending",
				dateApplied: "2024-11-25",
			},
		],
	},
	{
		id: "4",
		name: "EduGrow",
		description: "Empowering education through online platforms",
		location: "Seattle, WA",
		openPositions: 4,
		logo: "https://picsum.photos/700/400?ramdom",
		phone: "+1-206-555-4321",
		email: "hello@edugrow.com",
		jobPostings: [
			{
				id: "401",
				title: "UI/UX Designer",
				company: {
					name: "EduGrow",
					profileUrl: "/companies/edugrow",
				},
				description:
					"Design intuitive user experiences for our education platform.",
				salary: "$75,000 - $90,000",
				location: "Seattle, WA",
				applicationStatus: "Reviewed",
				dateApplied: "2024-11-22",
			},
		],
	},
];

export async function fetchCompanies(
	query: string,
	page: number,
	perPage = 9,
): Promise<{ companies: Company[]; totalPages: number }> {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));

	let filteredCompanies = mockCompanies;

	if (query) {
		const lowercaseQuery = query.toLowerCase();
		filteredCompanies = mockCompanies.filter(
			(company) =>
				company.name.toLowerCase().includes(lowercaseQuery) ||
				company.location.toLowerCase().includes(lowercaseQuery),
		);
	}

	const totalPages = Math.ceil(filteredCompanies.length / perPage);
	const startIndex = (page - 1) * perPage;
	const endIndex = startIndex + perPage;

	return {
		companies: filteredCompanies.slice(startIndex, endIndex),
		totalPages,
	};
}

export async function getCompanyById(id: string): Promise<Company | null> {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));

	return mockCompanies[Number(id)] || null;
}
