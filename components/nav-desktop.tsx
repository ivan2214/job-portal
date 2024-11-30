import Link from "next/link";
import {} from "lucide-react";
import { auth } from "@/auth";

import { UserMenu } from "@/components/user-menu";
import { Button } from "@/components/ui/button";

import { LoginButton } from "@/app/auth/components/login-button";
import { RegisterButton } from "@/app/auth/components/register-button";
import { prisma } from "@/db";
import { menuItems } from "@/constants";

const NavDesktop = async () => {
	const session = await auth();

	if (!session?.user.id) {
		return (
			<nav>
				<ul className="flex items-center space-x-4">
					{menuItems.map((item) => {
						console.log("item.path", item.path);

						return (
							<li key={item.text}>
								{item.path === "/auth/register" ? (
									<RegisterButton className="font-medium text-sm">
										{item.text}
									</RegisterButton>
								) : item.path === "/auth/login" ? (
									<LoginButton className="font-medium text-sm">
										{item.text}
									</LoginButton>
								) : (
									<Link
										href={item.path}
										className="font-medium text-sm hover:text-primary"
									>
										{item.text}
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
			postedJobs: true,
			company: true,
		},
	});

	return (
		<nav className="ml-auto hidden items-center gap-x-6 md:flex">
			<ul className="flex items-center gap-y-2">
				{menuItems.map((item) => {
					if (item.path !== "/auth/login" && item.path !== "/auth/register") {
						return (
							<Link key={item.text} href={item.path}>
								<Button
									className="transition-colors duration-300 hover:text-primary"
									variant="ghost"
								>
									{item.text}
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
