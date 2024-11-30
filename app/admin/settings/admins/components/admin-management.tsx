"use client";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import type { User } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { AddAdminModal, type newAdmin } from "./add-admin-modal";
import { AdminSummary } from "./admin-summary";
import { AdminTable } from "./admin-table";
import { EditAdminModal } from "./edit-admin-modal";
import { SearchBar } from "./search-bar";

export function AdminManagement({
	admins,
}: {
	admins: User[];
}) {
	const [filteredAdmins, setFilteredAdmins] = useState(admins);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [selectedAdmin, setSelectedAdmin] = useState(null);

	const handleSearch = (query: string) => {
		console.log("Searching for:", query);
	};

	const handleAddAdmin = (newAdmin: newAdmin) => {
		console.log("Adding new admin:", newAdmin);
	};

	const handleEditAdmin = (updatedAdmin: newAdmin) => {
		console.log("Editing admin:", updatedAdmin);
	};

	const handleSuspendAdmin = (adminId: string) => {
		console.log("Suspend admin:", adminId);
	};

	const handleRemoveAdmin = (adminId: string) => {
		console.log("Remove admin:", adminId);
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
				/* onEdit={(admin) => {
					setSelectedAdmin();
					setIsEditModalOpen(true);
				}} */
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
