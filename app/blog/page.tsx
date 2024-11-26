import { articles } from "./data/blog-data";
import ArticleList from "./components/article-list";

export default function BlogPage() {
	return (
		<>
			<h1 className="mb-8 font-bold text-4xl">Blog de Empleo</h1>
			<ArticleList articles={articles} />
		</>
	);
}
