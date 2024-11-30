import type { Route } from "@/types";

export const menuItems: Route[] = [
	{ path: "/empleos", icon: "search", text: "Buscar empleos" },
	{
		path: "/empresas",
		icon: "building",
		text: "Empresas",
	},
	{ path: "/blog", icon: "info", text: "Blog" },
	{
		path: "/mercado-laboral",
		icon: "chart-bar",
		text: "Estadisticas",
	},
	{
		path: "/auth/login",
		icon: "log-in",
		text: "Iniciar Sesion",
	},
	{
		path: "/auth/register",
		icon: "user-plus",
		text: "Registrarse",
	},
];

export const userLinks: Route[] = [
	{
		path: "/convertirse-en-profesional",
		text: "Convertirse en Profesional",
		icon: "user-pen",
	},
	{
		path: "/usuario/servicios",
		text: "Mis Servicios",
		icon: "briefcase",
	},
	{
		path: "/usuario/favoritos",
		text: "Mis Favoritos",
		icon: "heart",
	},
	{
		path: "/usuario/citas?type=client",
		text: "Mis citas como cliente",
		icon: "calendar",
	},
	{
		path: "/usuario/citas?type=professional",
		text: "Mis citas como profesional",
		icon: "calendar",
	},
];
