import type {
	Application,
	CategoryJob,
	Company,
	Job,
	User,
} from "@prisma/client";

export type JobWithRelations = Job & {
	company?: Company | null;
	applications?: Application[] | null;
	categoryJob?: CategoryJob | null;
};

export type ApplicationWithRelations = Application & {
	job?: JobWithRelations | null;
	user: User | null;
};
