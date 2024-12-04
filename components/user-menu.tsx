import Link from "next/link";
import { LogOut, UserIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "@/app/auth/components/logout-button";
import { Button } from "@/components/ui/button";
import type { UserWithRelations } from "@/types";
import { RoleUser } from "@prisma/client";
import {
	userMenuAdminLinks,
	userMenuCompanyLinks,
	userMenuLinks,
} from "@/constants";
import Icon from "./ui/icon";

interface UserMenuProps {
	currentUser: UserWithRelations | null;
}

export const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="border-none" size="icon" variant="outline">
					<Avatar>
						<AvatarImage alt="user" src={currentUser?.image || ""} />
						<AvatarFallback className="bg-sky-500">
							<UserIcon className="text-white" />
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<div className="mb-2 flex flex-col items-start gap-y-1 border-gray-300 border-b-2">
					<span className="px-2 py-1.5 font-extralight text-sm">
						{currentUser?.email}
					</span>
					<span className="px-2 py-1.5 font-extralight text-sm">
						{currentUser?.name}
					</span>
				</div>
				<div className="mb-2 flex flex-col items-start gap-y-1 border-gray-300 border-b-2">
					{currentUser?.role === RoleUser.ADMIN
						? userMenuAdminLinks.map((link) => (
								<DropdownMenuItem key={link.text}>
									<Link
										className="flex items-center space-x-2"
										href={link.path}
									>
										{link.icon && <Icon name={link.icon} className="h-5 w-5" />}
										{link.text}
									</Link>
								</DropdownMenuItem>
							))
						: currentUser?.role === RoleUser.COMPANY
							? userMenuCompanyLinks.map((link) => (
									<DropdownMenuItem key={link.text}>
										<Link
											className="flex items-center space-x-2"
											href={link.path}
										>
											{link.icon && (
												<Icon name={link.icon} className="h-5 w-5" />
											)}
											{link.text}
										</Link>
									</DropdownMenuItem>
								))
							: userMenuLinks.map((link) => (
									<DropdownMenuItem key={link.text}>
										<Link
											className="flex items-center space-x-2"
											href={link.path}
										>
											{link.icon && (
												<Icon name={link.icon} className="h-5 w-5" />
											)}
											{link.text}
										</Link>
									</DropdownMenuItem>
								))}
				</div>

				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LogoutButton>
						<Button>
							<LogOut className="mr-2 h-4 w-4" />
							Cerrar Sesion
						</Button>
					</LogoutButton>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
