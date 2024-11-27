"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, FileText, Building2, UserPen } from "lucide-react";

const navItems = [
	{ href: "/employer", label: "Inicio", icon: Building2 },
	{ href: "/employer/jobs", label: "Jobs", icon: Briefcase },
	{ href: "/employer/applications", label: "Applications", icon: FileText },
	{ href: "/employer/profile", label: "Profile", icon: UserPen },
];

export function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="w-64 bg-white shadow-md">
			<nav className="p-4">
				<ul className="space-y-2">
					{navItems.map((item) => (
						<li key={item.href}>
							<Link
								href={item.href}
								className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 transition-colors ${
									pathname === item.href
										? "bg-gray-100 text-gray-900"
										: "hover:bg-gray-50"
								}`}
							>
								<item.icon className="h-5 w-5" />
								<span>{item.label}</span>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
}
