import type { Metadata } from "next";
import AdminSettings from "./components/admin-settings";
import { Container } from "@/components/container";

export const metadata: Metadata = {
	title: "Admin Settings",
	description: "Configure global application settings",
};

export default function AdminSettingsPage() {
	return (
		<Container>
			<h1 className="mb-6 font-bold text-3xl">Admin Settings</h1>
			<AdminSettings />
		</Container>
	);
}
