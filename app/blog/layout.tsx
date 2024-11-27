import type { ReactNode } from "react";
import Sidebar from "./components/sidebar";
import { categories, recentArticles } from "./data/blog-data";
import { Container } from "@/components/container";
interface BlogLayoutFormProps {
	children: ReactNode;
}

const BlogLayout: React.FC<BlogLayoutFormProps> = ({ children }) => {
	return (
		<Container>
			<div className="flex flex-col gap-8 md:flex-row">
				<main className="md:w-2/3">{children}</main>
				<aside className="md:w-1/3">
					<Sidebar categories={categories} recentArticles={recentArticles} />
				</aside>
			</div>
		</Container>
	);
};

export default BlogLayout;
