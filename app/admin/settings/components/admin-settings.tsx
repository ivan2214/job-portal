"use client";

import { Button } from "@/components/ui/button";
import {} from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import GeneralSettings from "./general-settings";
import NotificationSettings from "./notification-settings";
import SecuritySettings from "./security-settings";

export default function AdminSettings() {
	const [activeTab, setActiveTab] = useState("general");

	const handleSave = () => {
		// Implement save logic here
		toast("Settings saved", {
			description: "Your changes have been successfully saved.",
		});
	};

	const handleReset = () => {
		// Implement reset logic here
		toast("Settings reset", {
			description: "All changes have been reset to their default values.",
		});
	};

	return (
		<div className="flex flex-col gap-6 md:flex-row">
			<div className="flex flex-col gap-6 md:flex-row">
				<div className="flex-1 space-y-6">
					<GeneralSettings />

					<SecuritySettings />

					<NotificationSettings />

					<div className="mt-6 flex justify-end space-x-4">
						<Button variant="outline" onClick={handleReset}>
							Reset Changes
						</Button>
						<Button onClick={handleSave}>Save Changes</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
