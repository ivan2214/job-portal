import { Briefcase, Building2, Home, Settings, Users } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
	return (
		<div className="w-64 bg-white shadow-md">
			<div className="p-4">
				<h1 className="font-bold text-2xl text-gray-800">Admin Panel</h1>
			</div>
			<nav className="mt-4">
				<Link
					href="/admin"
					className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
				>
					<Home className="mr-2" size={20} />
					Dashboard
				</Link>
				<Link
					href="/admin/employers"
					className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
				>
					<Building2 className="mr-2" size={20} />
					Employers
				</Link>
				<Link
					href="/admin/users"
					className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
				>
					<Users className="mr-2" size={20} />
					Users
				</Link>
				<Link
					href="/admin/jobs"
					className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
				>
					<Briefcase className="mr-2" size={20} />
					Jobs
				</Link>
				<Link
					href="/admin/settings"
					className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
				>
					<Settings className="mr-2" size={20} />
					Settings
				</Link>
			</nav>
		</div>
	);
}
