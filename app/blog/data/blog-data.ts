export interface Article {
	id: string;
	title: string;
	summary: string;
	content: string;
	tags: string[];
	date: string;
}

export const articles: Article[] = [
	{
		id: "1",
		title: "Cómo preparar un currículum efectivo",
		summary:
			"Aprende a destacar tus habilidades y experiencia para conseguir más entrevistas.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
		tags: ["currículum", "consejos"],
		date: "2023-05-15",
	},
	{
		id: "2",
		title: "Las 10 preguntas más comunes en entrevistas de trabajo",
		summary:
			"Prepárate para tu próxima entrevista con estas respuestas modelo.",
		content:
			"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...",
		tags: ["entrevistas", "preparación"],
		date: "2023-05-20",
	},
	{
		id: "3",
		title: "Tendencias del mercado laboral en 2023",
		summary:
			"Descubre las habilidades más demandadas y los sectores en crecimiento.",
		content:
			"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur...",
		tags: ["tendencias", "mercado laboral"],
		date: "2023-05-25",
	},
];

export const categories = [
	"Búsqueda de empleo",
	"Desarrollo profesional",
	"Entrevistas",
	"Networking",
	"Emprendimiento",
];

export const recentArticles = articles.slice(0, 3);
