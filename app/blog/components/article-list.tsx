import type { Article } from "../data/blog-data";
import ArticleCard from "./article-card";

interface ArticleListProps {
	articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
	return (
		<div className="space-y-8">
			{articles.map((article) => (
				<ArticleCard key={article.id} article={article} />
			))}
		</div>
	);
}
