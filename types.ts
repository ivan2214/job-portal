import type { Application, Company, Job, User } from "@prisma/client";

export type JobWithRelations = Job & {
	Company: Company | null;
	applications: Application[] | null;
};

export type ApplicationWithRelations = Application & {
	job?: JobWithRelations | null;
	user: User | null;
};
