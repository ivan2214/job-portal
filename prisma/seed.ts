import { faker } from "@faker-js/faker";
import { PrismaClient, TypeJob } from "@prisma/client";
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

	// crear categorias para trabajos

	const categoriesData = [
		"Tecnología",
		"Administración",
		"Ventas",
		"Educación",
		"Salud",
		"Construcción",
		"Turismo",
		"Agricultura",
	];

	const categories = await Promise.all(
		categoriesData.map((name) =>
			prisma.categoryJob.create({
				data: {
					name,
				},
			}),
		),
	);

	// Crear Empleos asociados a empleadores y empresas
	const jobs = await Promise.all(
		Array.from({ length: 20 }).map(() => {
			const employer = faker.helpers.arrayElement(employers);
			const company = faker.helpers.arrayElement(companies);
			const isActive = faker.datatype.boolean();
			const isArchived = !isActive && faker.datatype.boolean();
			const isFeatured = isActive && faker.datatype.boolean();
			const isDeleted =
				isArchived && !isFeatured && !isActive && faker.datatype.boolean();
			const category = faker.helpers.arrayElement(categories);

			return prisma.job.create({
				data: {
					title: faker.person.jobTitle(),
					description: faker.lorem.paragraph(),
					salary: `$${faker.number.int({ min: 50_000, max: 150_000 })} - $${faker.number.int({ min: 150_000, max: 300_000 })} al año`,
					location: faker.location.city(),
					userId: employer.id,
					companyId: company.id,
					categoryJobId: category.id,
					applicationStatus: "PENDING",
					isActive,
					isArchived,
					isFeatured,
					isDeleted,
				},
			});
		}),
	);

	// crear mas trabajos

	const jobsData2 = [
		{
			title: "Desarrollador Web",
			company: "TechLules",
			location: "Lules, Tucumán",

			description:
				"Empresa de tecnología busca desarrollador web con experiencia en React y Node.js.",
			salary: "$80,000 - $120,000 al año",
		},
		{
			title: "Asistente Administrativo",
			company: "Oficina Central",
			location: "San Miguel de Tucumán",

			description:
				"Se busca asistente administrativo para importante empresa de la zona.",
			salary: "$40,000 - $60,000 al año",
		},
		{
			title: "Profesor de Inglés",
			company: "Instituto de Idiomas",
			location: "Lules, Tucumán",

			description:
				"Instituto de idiomas busca profesor de inglés con experiencia para clases grupales.",
			salary: "$20,000 - $30,000 al año",
		},
	];

	// crear los jobs

	for (const jobData of jobsData2) {
		const employer = faker.helpers.arrayElement(employers);
		const company = faker.helpers.arrayElement(companies);
		const isActive = faker.datatype.boolean();
		const isArchived = !isActive && faker.datatype.boolean();
		const isFeatured = isActive && faker.datatype.boolean();
		const isDeleted =
			isArchived && !isFeatured && !isActive && faker.datatype.boolean();
		const typeJob = faker.helpers.arrayElement(Object.values(TypeJob));
		const category = faker.helpers.arrayElement(categories);
		const job = await prisma.job.create({
			data: {
				title: jobData.title,
				description: jobData.description,
				salary: jobData.salary,
				location: jobData.location,
				userId: employer.id,
				companyId: company.id,
				categoryJobId: category.id,
				applicationStatus: "PENDING",

				type: typeJob,
				isActive,
				isArchived,
				isFeatured,
				isDeleted,
			},
		});
	}

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
					dateApplied: faker.date.anytime(),
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
