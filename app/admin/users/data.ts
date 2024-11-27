export type User = {
	id: string;
	name: string;
	email: string;
	role: "Employer" | "Employee";
};

export const users: User[] = [
	{ id: "1", name: "John Doe", email: "john@example.com", role: "Employer" },
	{ id: "2", name: "Jane Smith", email: "jane@example.com", role: "Employee" },
	{
		id: "3",
		name: "Alice Johnson",
		email: "alice@example.com",
		role: "Employee",
	},
	{ id: "4", name: "Bob Williams", email: "bob@example.com", role: "Employer" },
	{
		id: "5",
		name: "Charlie Brown",
		email: "charlie@example.com",
		role: "Employee",
	},
	// Add more mock users as needed
];

export async function getUsers(
	search = "",
	page = 1,
	limit = 10,
): Promise<{ users: User[]; total: number }> {
	// Simulate API call delay
	await new Promise((resolve) => setTimeout(resolve, 500));

	let filteredUsers = users;

	if (search) {
		const searchLower = search.toLowerCase();
		filteredUsers = users.filter(
			(user) =>
				user.name.toLowerCase().includes(searchLower) ||
				user.email.toLowerCase().includes(searchLower),
		);
	}

	const total = filteredUsers.length;
	const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

	return { users: paginatedUsers, total };
}
