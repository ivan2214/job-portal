import Link from "next/link";
import type { Article } from "../data/blog-data";

interface SidebarProps {
	categories: string[];
	recentArticles: Article[];
}

export default function Sidebar({ categories, recentArticles }: SidebarProps) {
	return (
		<div className="space-y-8">
			<div>
				<h3 className="mb-4 font-semibold text-xl">Categorías Populares</h3>
				<ul className="space-y-2">
					{categories.map((category) => (
						<li key={category}>
							<Link href="#" className="text-blue-600 hover:underline">
								{category}
							</Link>
						</li>
					))}
				</ul>
			</div>
			<div>
				<h3 className="mb-4 font-semibold text-xl">Artículos Recientes</h3>
				<ul className="space-y-4">
					{recentArticles.map((article) => (
						<li key={article.id}>
							<Link
								href={`/blog/${article.id}`}
								className="text-blue-600 hover:underline"
							>
								{article.title}
							</Link>
							<p className="text-gray-500 text-sm">{article.date}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
