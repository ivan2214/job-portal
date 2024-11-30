import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbsProps {
	items: {
		label: string;
		href: string;
	}[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
	return (
		<nav className="flex" aria-label="Breadcrumb">
			<ol className="flex items-center space-x-2">
				{items.map((item, index) => (
					<li key={item.href} className="flex items-center">
						{index > 0 && (
							<ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
						)}
						{index === items.length - 1 ? (
							<span className="text-muted-foreground">{item.label}</span>
						) : (
							<Link
								href={item.href}
								className="font-medium text-primary text-sm hover:underline"
							>
								{item.label}
							</Link>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
}
