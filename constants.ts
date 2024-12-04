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

export const userMenuLinks: Route[] = [
	{
		path: "/user",
		text: "Dashboard",
		icon: "panel-bottom",
	},
	{
		path: "/user/applications",
		text: "Solicitudes",
		icon: "clipboard-list",
	},
	{
		path: "/user/profile",
		text: "Perfil",
		icon: "user",
	},
];

export const userMenuCompanyLinks: Route[] = [
	{
		path: "/company",
		text: "Dashboard",
		icon: "panel-bottom",
	},
	{
		path: "/company/jobs",
		text: "Empleos",
		icon: "search",
	},
	{
		path: "/company/applications",
		text: "Solicitudes",
		icon: "clipboard-list",
	},
	{
		path: "/company/profile",
		text: "Perfil",
		icon: "user",
	},
];

export const userMenuAdminLinks: Route[] = [
	{
		path: "/admin",
		text: "Dashboard",
		icon: "panel-bottom",
	},
	{
		path: "/admin/companies",
		text: "Empresas",
		icon: "building",
	},
	{
		path: "/admin/users",
		text: "Usuarios",
		icon: "users",
	},
	{
		path: "/admin/jobs",
		text: "Empleos",
		icon: "search",
	},
	{
		path: "/admin/applications",
		text: "Solicitudes",
		icon: "clipboard-list",
	},
	{
		path: "/admin/settings",
		text: "Configuraciones",
		icon: "settings",
	},
];
