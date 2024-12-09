import { auth } from "@/auth";
import {} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/user-menu";

import { LoginButton } from "@/app/(routes)/auth/components/login-button";
import { RegisterButton } from "@/app/(routes)/auth/components/register-button";
import { menuItems } from "@/constants";
import { prisma } from "@/db";

const NavDesktop = async () => {
	const session = await auth();

	if (!session?.user.id) {
		return (
			<nav>
				<ul className="flex items-center space-x-2">
					{menuItems.map((item) => {
						return (
							<li key={item.title}>
								{item.url === "/auth/register" ? (
									<RegisterButton className="font-medium text-sm">
										{item.icon && <item.icon />}
										{item.title}
									</RegisterButton>
								) : item.url === "/auth/login" ? (
									<LoginButton className="font-medium text-sm">
										{item.icon && <item.icon />}
										{item.title}
									</LoginButton>
								) : (
									<Link key={item.title} href={item.url}>
										<Button
											className="transition-colors duration-300 hover:text-primary"
											variant="ghost"
										>
											{item.icon && <item.icon />}
											{item.title}
										</Button>
									</Link>
								)}
							</li>
						);
					})}
				</ul>
			</nav>
		);
	}

	const currentUser = await prisma.user.findUnique({
		where: {
			id: session?.user?.id,
		},
		include: {
			applications: true,
			company: true,
		},
	});

	return (
		<nav className="ml-auto hidden items-center gap-x-6 md:flex">
			<ul className="flex items-center gap-y-2">
				{menuItems.map((item) => {
					if (item.url !== "/auth/login" && item.url !== "/auth/register") {
						return (
							<Link key={item.title} href={item.url}>
								<Button
									className="transition-colors duration-300 hover:text-primary"
									variant="ghost"
								>
									{item.icon && <item.icon />}
									{item.title}
								</Button>
							</Link>
						);
					}
				})}
				{currentUser && <UserMenu currentUser={currentUser} />}
			</ul>
		</nav>
	);
};

export default NavDesktop;
