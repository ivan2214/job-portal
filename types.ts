import type {
	Application,
	CategoryJob,
	Company,
	ContactInfo,
	Job,
	Requirements,
	User,
} from "@prisma/client";

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
};
