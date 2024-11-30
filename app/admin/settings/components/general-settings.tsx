import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export default function GeneralSettings() {
	return (
		<div className="space-y-6">
			<h2 className="font-semibold text-2xl">General Settings</h2>
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="app-name">Application Name</Label>
					<Input id="app-name" placeholder="Enter application name" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="max-job-postings">
						Maximum Job Postings per Company
					</Label>
					<div className="flex items-center space-x-4">
						<Slider
							id="max-job-postings"
							defaultValue={[10]}
							max={50}
							step={1}
							className="w-[60%]"
						/>
						<span className="text-muted-foreground text-sm">10</span>
					</div>
				</div>
				<div className="space-y-2">
					<Label htmlFor="account-verification">
						Account Verification Requirement
					</Label>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Select defaultValue="email">
									<SelectTrigger id="account-verification">
										<SelectValue placeholder="Select verification method" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="none">None</SelectItem>
										<SelectItem value="email">Email Verification</SelectItem>
										<SelectItem value="phone">Phone Verification</SelectItem>
										<SelectItem value="both">
											Email and Phone Verification
										</SelectItem>
									</SelectContent>
								</Select>
							</TooltipTrigger>
							<TooltipContent>
								<p>
									Choose the level of verification required for new accounts
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
		</div>
	);
}
