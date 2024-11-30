import Link from "next/link";
import {
	Calendar,
	CircleHelp,
	LogOut,
	Settings,
	Star,
	UserIcon,
} from "lucide-react";

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
					<DropdownMenuItem className="font-extralight">
						{currentUser?.name}
					</DropdownMenuItem>
					<DropdownMenuItem className="font-extralight">
						{currentUser?.email}
					</DropdownMenuItem>
				</div>
				<div className="mb-2 flex flex-col items-start gap-y-1 border-gray-300 border-b-2">
					<DropdownMenuItem>
						<Link className="flex items-start gap-x-2" href="/user">
							<UserIcon className="h-4 w-4" />
							Cuenta
						</Link>
					</DropdownMenuItem>
					{currentUser?.applications &&
					currentUser?.applications?.length > 0 ? (
						<DropdownMenuItem>
							<Link
								className="flex items-start gap-x-2"
								href="/user/citas?type=client"
							>
								<Calendar className="h-4 w-4" />
								Mis aplicaciones
							</Link>
						</DropdownMenuItem>
					) : null}
					{currentUser?.company?.jobPostings &&
					currentUser?.company?.jobPostings?.length > 0 ? (
						<DropdownMenuItem>
							<Link className="flex items-start gap-x-2" href="/user/jobs">
								<Calendar className="h-4 w-4" />
								Mis empleos
							</Link>
						</DropdownMenuItem>
					) : null}
					<DropdownMenuItem>
						<Link className="flex items-start gap-x-2" href="/user/favoritos">
							<Star className="h-4 w-4" />
							Favoritos
						</Link>
					</DropdownMenuItem>
					{currentUser?.company && (
						<DropdownMenuItem>
							<Link className="flex items-start gap-x-2" href="/company/jobs">
								<svg className="h-4 w-4" viewBox="0 0 24 24">
									<path d="m16.06 13.09l5.63 5.59l-3.32 3.28l-5.59-5.59v-.92l2.36-2.36zm.91-2.53L16 9.6l-4.79 4.8v1.97L5.58 22L2.3 18.68l5.59-5.59h1.97l.78-.78L6.8 8.46H5.5L2.69 5.62L5.31 3l2.8 2.8v1.31L12 10.95l2.66-2.66l-.96-1.01L15 5.97h-2.66l-.65-.65L15 2l.66.66v2.66L16.97 4l3.28 3.28c1.09 1.1 1.09 2.89 0 3.98l-1.97-2.01z" />
								</svg>
								Mis Trabajos
							</Link>
						</DropdownMenuItem>
					)}
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link className="flex items-start gap-x-2" href="/user/profile">
						<Settings className="h-4 w-4" />
						Ajustes
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link className="flex items-start gap-x-2" href="/user/help">
						<CircleHelp className="h-4 w-4" />
						Ayuda
					</Link>
				</DropdownMenuItem>
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
