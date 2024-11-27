import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { articles } from "../data/blog-data";

export default function ArticlePage({ params }: { params: { id: string } }) {
	const article = articles.find((a) => a.id === params.id);

	if (!article) {
		notFound();
	}

	return (
		<article className="mx-auto max-w-3xl">
			<h1 className="mb-4 font-bold text-4xl">{article.title}</h1>
			<p className="mb-4 text-gray-500">{article.date}</p>
			<div className="mb-6 flex flex-wrap gap-2">
				{article.tags.map((tag) => (
					<Badge key={tag} variant="secondary">
						{tag}
					</Badge>
				))}
			</div>
			<div className="prose max-w-none">
				<p>{article.content}</p>
			</div>
		</article>
	);
}
