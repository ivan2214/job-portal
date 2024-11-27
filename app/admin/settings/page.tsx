import type { Metadata } from "next";
import AdminSettings from "./components/admin-settings";

export const metadata: Metadata = {
	title: "Admin Settings",
	description: "Configure global application settings",
};

export default function AdminSettingsPage() {
	return <AdminSettings />;
}
