import Icon from "@/components/ui/icon";
import { userMenuAdminLinks } from "@/constants";
import {} from "lucide-react";
import Link from "next/link";

export function Sidebar() {
	return (
		<div className="w-64 bg-white shadow-md">
			<div className="p-4">
				<h1 className="font-bold text-2xl text-gray-800">Admin Panel</h1>
			</div>
			<nav className="mt-4">
				{userMenuAdminLinks.map((link) => (
					<Link
						key={link.text}
						href={link.path}
						className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
					>
						{link.icon && <Icon name={link.icon} className="mr-2 h-5 w-5" />}
						<span>{link.text}</span>
					</Link>
				))}
			</nav>
		</div>
	);
}
