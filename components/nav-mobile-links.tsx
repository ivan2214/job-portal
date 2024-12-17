import { LogIn, Menu, UserPlus } from "lucide-react";
import Link from "next/link";

import { LoginButton } from "@/app/(routes)/auth/components/login-button";
import { RegisterButton } from "@/app/(routes)/auth/components/register-button";
import type { UserWithRelations } from "@/types";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { menuItems } from "@/constants";

interface NavMobileLinksProps {
	currentUser: UserWithRelations | null;
}

const NavMobileLinks: React.FC<NavMobileLinksProps> = ({ currentUser }) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="icon" variant="outline">
					<Menu className="h-6 w-6" />
					<span className="sr-only">Abrir menú</span>
				</Button>
			</SheetTrigger>
			<SheetContent className="w-[300px] sm:w-[400px]" side="right">
				<SheetHeader>
					<SheetTitle className="font-bold text-2xl">Menú</SheetTitle>
				</SheetHeader>
				<nav className="mt-6">
					<ul className="flex w-full flex-col items-start gap-y-2">
						{menuItems.map((item) => (
							<Link
								key={item.title}
								className="w-full justify-start text-lg"
								href={item.url}
							>
								{item.icon && <item.icon />}
								<Button variant="ghost">{item.title}</Button>
							</Link>
						))}
						{!currentUser && (
							<section className="flex w-full flex-col items-start gap-y-2">
								<LoginButton asChild className="w-full" mode="redirect">
									<Button
										className="w-full justify-start text-lg"
										variant="outline"
									>
										<LogIn className="mr-2 h-5 w-5" />
										Iniciar Sesion
									</Button>
								</LoginButton>
								<RegisterButton asChild className="w-full" mode="redirect">
									<Button className="w-full justify-start text-lg">
										<UserPlus className="mr-2 h-5 w-5" />
										Registrarse
									</Button>
								</RegisterButton>
							</section>
						)}
					</ul>
				</nav>
			</SheetContent>
		</Sheet>
	);
};

export default NavMobileLinks;
