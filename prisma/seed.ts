import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	console.log("Seeding database...");

	const saltRounds = 10;

	// Crear Administradores
	const adminPassword = await bcrypt.hash("admin123", saltRounds);
	const admins = await prisma.user.createMany({
		data: Array.from({ length: 3 }).map(() => ({
			name: faker.person.fullName(),
			email: faker.internet.email(),
			hashedPassword: adminPassword,
			role: "ADMIN",
		})),
	});

	// Crear Empresas
	const companies = await Promise.all(
		Array.from({ length: 5 }).map(() =>
			prisma.company.create({
				data: {
					name: faker.company.name(),
					description: faker.company.catchPhrase(),
					location: faker.location.city(),
					openPositions: faker.number.int({ min: 1, max: 10 }),
					logo: faker.image.urlPicsumPhotos(),
					phone: faker.phone.number(),
					email: faker.internet.email(),
					bio: faker.lorem.paragraph(),
				},
			}),
		),
	);

	// Crear Empleadores
	const employerPassword = await bcrypt.hash("employer123", saltRounds);
	const employers = await Promise.all(
		Array.from({ length: 10 }).map(() =>
			prisma.user.create({
				data: {
					name: faker.person.fullName(),
					email: faker.internet.email(),
					hashedPassword: employerPassword,
					role: "EMPLOYER",
				},
			}),
		),
	);

	// Crear Empleos asociados a empleadores y empresas
	const jobs = await Promise.all(
		Array.from({ length: 20 }).map(() => {
			const employer = faker.helpers.arrayElement(employers);
			const company = faker.helpers.arrayElement(companies);

			return prisma.job.create({
				data: {
					title: faker.person.jobTitle(),
					description: faker.lorem.paragraph(),
					salary: faker.number.int({ min: 30000, max: 100000 }),
					location: faker.location.city(),
					userId: employer.id,
					companyId: company.id,
					applicationStatus: "PENDING",
					dateApplied: faker.date.recent(),
				},
			});
		}),
	);

	// Crear usuarios
	const employeePassword = await bcrypt.hash("employee123", saltRounds);
	const employees = await Promise.all(
		Array.from({ length: 15 }).map(() =>
			prisma.user.create({
				data: {
					name: faker.person.fullName(),
					email: faker.internet.email(),
					hashedPassword: employeePassword,
					role: "EMPLOYEE",
				},
			}),
		),
	);

	// Crear Postulaciones de usuarios a Empleos
	const applications = await Promise.all(
		Array.from({ length: 50 }).map(() => {
			const employee = faker.helpers.arrayElement(employees);
			const job = faker.helpers.arrayElement(jobs);

			return prisma.application.create({
				data: {
					userId: employee.id,
					jobId: job.id,
					status: faker.helpers.arrayElement([
						"PENDING",
						"REVIEWED",
						"REJECTED",
						"ACCEPTED",
					]),
				},
			});
		}),
	);

	console.log("Seeding completed successfully!");
}

main()
	.catch((e) => {
		console.error("Error seeding database:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
