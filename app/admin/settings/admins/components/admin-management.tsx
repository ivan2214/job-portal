"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { AddAdminModal } from "./add-admin-modal";
import { AdminSummary } from "./admin-summary";
import { AdminTable } from "./admin-table";
import { EditAdminModal } from "./edit-admin-modal";
import { SearchBar } from "./search-bar";
import { Container } from "@/components/container";

// Mock data for admins
const initialAdmins = [
	{
		id: 1,
		name: "John Doe",
		email: "john@example.com",
		role: "Super Admin",
		status: "Active",
	},
	{
		id: 2,
		name: "Jane Smith",
		email: "jane@example.com",
		role: "Admin",
		status: "Active",
	},
	{
		id: 3,
		name: "Bob Johnson",
		email: "bob@example.com",
		role: "Moderator",
		status: "Suspended",
	},
];

export function AdminManagement() {
	const [admins, setAdmins] = useState(initialAdmins);
	const [filteredAdmins, setFilteredAdmins] = useState(admins);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [selectedAdmin, setSelectedAdmin] = useState(null);

	const handleSearch = (query: string) => {
		const filtered = admins.filter(
			(admin) =>
				admin.name.toLowerCase().includes(query.toLowerCase()) ||
				admin.email.toLowerCase().includes(query.toLowerCase()),
		);
		setFilteredAdmins(filtered);
	};

	const handleAddAdmin = (newAdmin) => {
		setAdmins([
			...admins,
			{ id: admins.length + 1, ...newAdmin, status: "Active" },
		]);
		setIsAddModalOpen(false);
	};

	const handleEditAdmin = (updatedAdmin) => {
		setAdmins(
			admins.map((admin) =>
				admin.id === updatedAdmin.id ? updatedAdmin : admin,
			),
		);
		setIsEditModalOpen(false);
	};

	const handleSuspendAdmin = (adminId) => {
		setAdmins(
			admins.map((admin) =>
				admin.id === adminId
					? {
							...admin,
							status: admin.status === "Active" ? "Suspended" : "Active",
						}
					: admin,
			),
		);
	};

	const handleRemoveAdmin = (adminId) => {
		p;
		setAdmins(admins.filter((admin) => admin.id !== adminId));
	};

	return (
		<Container>
			<h1 className="mb-8 font-bold text-3xl">Admin Management</h1>
			<div className="mb-6 flex items-center justify-between">
				<SearchBar onSearch={handleSearch} />
				<Button onClick={() => setIsAddModalOpen(true)}>
					<PlusCircle className="mr-2 h-4 w-4" /> Add New Admin
				</Button>
			</div>
			<AdminSummary admins={admins} />
			<AdminTable
				admins={filteredAdmins}
				onEdit={(admin) => {
					setSelectedAdmin(admin);
					setIsEditModalOpen(true);
				}}
				onSuspend={handleSuspendAdmin}
				onRemove={handleRemoveAdmin}
			/>
			<AddAdminModal
				isOpen={isAddModalOpen}
				onClose={() => setIsAddModalOpen(false)}
				onAdd={handleAddAdmin}
			/>
			<EditAdminModal
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				onEdit={handleEditAdmin}
				admin={selectedAdmin}
			/>
		</Container>
	);
}
