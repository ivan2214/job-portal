import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export default function NotificationSettings() {
	return (
		<div className="space-y-6">
			<h2 className="font-semibold text-2xl">Notification Settings</h2>
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="global-notification">
						Global Notification Message
					</Label>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Textarea
									id="global-notification"
									placeholder="Enter a message to be displayed to all users"
								/>
							</TooltipTrigger>
							<TooltipContent>
								<p>
									This message will be shown to all users across the platform
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label htmlFor="email-notifications">Email Notifications</Label>
						<p className="text-muted-foreground text-sm">
							Send important updates via email
						</p>
					</div>
					<Switch id="email-notifications" />
				</div>
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label htmlFor="push-notifications">Push Notifications</Label>
						<p className="text-muted-foreground text-sm">
							Enable in-app push notifications
						</p>
					</div>
					<Switch id="push-notifications" />
				</div>
			</div>
		</div>
	);
}
