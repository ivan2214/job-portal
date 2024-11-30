import { auth } from "@/auth";
import dynamic from "next/dynamic";

import { UserMenu } from "./user-menu";
import { prisma } from "@/db";

const NavMobileLinks = dynamic(() => import("@/components/nav-mobile-links"));

export default async function MenuMobile() {
	const session = await auth();

	if (!session) {
		return null;
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
		<section className="flex items-center justify-between gap-4 md:hidden">
			<NavMobileLinks currentUser={currentUser} />

			{currentUser ? <UserMenu currentUser={currentUser} /> : null}
		</section>
	);
}
