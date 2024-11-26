import Link from "next/link";
import type { Article } from "../data/blog-data";
import { Badge } from "@/components/ui/badge";

interface ArticleCardProps {
	article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
	return (
		<div className="rounded-lg bg-white p-6 shadow-md">
			<Link href={`/blog/${article.id}`}>
				<h2 className="mb-2 font-semibold text-2xl hover:text-blue-600">
					{article.title}
				</h2>
			</Link>
			<p className="mb-4 text-gray-600">{article.summary}</p>
			<div className="mb-2 flex flex-wrap gap-2">
				{article.tags.map((tag) => (
					<Badge key={tag} variant="secondary">
						{tag}
					</Badge>
				))}
			</div>
			<p className="text-gray-500 text-sm">{article.date}</p>
		</div>
	);
}
