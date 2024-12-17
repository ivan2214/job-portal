import type { ItemSideBar } from "@/types";
import {
	Building,
	ChartBar,
	ClipboardList,
	Info,
	LogIn,
	PanelBottom,
	Search,
	Settings,
	User,
	UserPlus,
	Users,
} from "lucide-react";

export const menuItems: ItemSideBar[] = [
	{ url: "/empleos", icon: Search, title: "Buscar empleos" },
	{
		url: "/empresas",
		icon: Building,
		title: "Empresas",
	},
	{ url: "/blog", icon: Info, title: "Blog" },
	{
		url: "/mercado-laboral",
		icon: ChartBar,
		title: "Estadisticas",
	},
	{
		url: "/auth/login",
		icon: LogIn,
		title: "Iniciar Sesion",
	},
	{
		url: "/auth/register",
		icon: UserPlus,
		title: "Registrarse",
	},
];

export const userMenuLinks: ItemSideBar[] = [
	{
		url: "/user",
		title: "Dashboard",
		icon: PanelBottom,
	},
	{
		url: "/user/applications",
		title: "Solicitudes",
		icon: ClipboardList,
	},
	{
		url: "/user/profile",
		title: "Perfil",
		icon: User,
	},
];

export const userMenuCompanyLinks: ItemSideBar[] = [
	{
		url: "/company",
		title: "Dashboard",
		icon: PanelBottom,
	},
	{
		url: "/company/jobs",
		title: "Empleos",
		icon: Search,
	},
	{
		url: "/company/applications",
		title: "Solicitudes",
		icon: ClipboardList,
	},
	{
		url: "/company/profile",
		title: "Perfil",
		icon: User,
	},
];

export const userMenuAdminLinks: ItemSideBar[] = [
	{
		url: "/admin",
		title: "Dashboard",
		icon: PanelBottom,
	},
	{
		url: "/admin/users",
		title: "Usuarios",
		icon: Users,
	},
	{
		url: "/admin/jobs",
		title: "Empleos",
		icon: PanelBottom,
	},
	{
		url: "/admin/companies",
		title: "Empresas",
		icon: PanelBottom,
	},
	{
		url: "/admin/applications",
		title: "Solicitudes",
		icon: ClipboardList,
	},
	{
		url: "/admin/settings",
		title: "Configuraciones",
		icon: Settings,
		items: [
			{
				title: "Admins",
				url: "/admin/settings/admins",
			},
			{
				title: "Logs",
				url: "/admin/settings/logs",
			},
		],
	},
];
