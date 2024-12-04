import type {
	Application,
	CategoryJob,
	Company,
	ContactInfo,
	Job,
	Requirements,
	User,
} from "@prisma/client";
import type { LucideIcon } from "lucide-react";
import type dynamicIconImports from "lucide-react/dynamicIconImports";

export interface Route {
	icon?: keyof typeof dynamicIconImports;
	text: string;
	path: string;
	active?: boolean;
	subRoutes?: Route[];
}

export type JobWithRelations = Job & {
	company?: Company | null;
	applications?: Application[] | null;
	categoryJob?: CategoryJob | null;
	contactInfo?: ContactInfo | null;
	requirements?: Requirements[] | null;
};

export type ApplicationWithRelations = Application & {
	job?: JobWithRelations | null;
	user?: User | null;
};

export type UserWithRelations = User & {
	applications?: ApplicationWithRelations[] | null;
	company?: CompanyWithRelations | null;
};

export type CompanyWithRelations = Company & {
	jobPostings?: JobWithRelations[] | null;
	user?: User | null;
};

export interface ItemSideBar {
	title: string;
	url: string;
	icon: LucideIcon;
	isActive?: boolean;
	items?: {
		title: string;
		url: string;
	}[];
}
