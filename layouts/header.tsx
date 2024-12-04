import Link from "next/link";

import { Container } from "@/components/container";
import NavDesktop from "@/components/nav-desktop";
import NavMobile from "@/components/nav-mobile";

export const Header = () => {
	return (
		<header className="sticky top-0 z-50 bg-white shadow-sm">
			<Container className="flex items-center justify-between px-4 py-4">
				<Link href="/" className="flex items-center space-x-2">
					<span className="font-bold text-primary text-xl">Lules Jobs</span>
				</Link>

				<NavDesktop />
				<NavMobile />
			</Container>
		</header>
	);
};
