import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SecuritySettings() {
	return (
		<div className="space-y-6">
			<h2 className="font-semibold text-2xl">Security Settings</h2>
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label htmlFor="two-factor">Two-Factor Authentication</Label>
						<p className="text-muted-foreground text-sm">
							Require 2FA for all admin accounts
						</p>
					</div>
					<Switch id="two-factor" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="password-policy">Minimum Password Length</Label>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Input
									id="password-policy"
									type="number"
									min={8}
									max={32}
									defaultValue={12}
								/>
							</TooltipTrigger>
							<TooltipContent>
								<p>Set the minimum required length for user passwords</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						<Label htmlFor="ip-restriction">IP Address Restriction</Label>
						<p className="text-muted-foreground text-sm">
							Limit admin access to specific IP ranges
						</p>
					</div>
					<Switch id="ip-restriction" />
				</div>
			</div>
		</div>
	);
}
