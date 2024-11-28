import { faker } from "@faker-js/faker";
import { ApplicationStatus, PrismaClient, RoleUser } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	console.log("Seeding database...");

	const saltRounds = 10;

	// Crear Administradores
	const adminPassword = await bcrypt.hash("admin123", saltRounds);
	await prisma.user.createMany({
		data: Array.from({ length: 3 }).map(() => ({
			name: faker.person.fullName(),
			email: faker.internet.email(),
			hashedPassword: adminPassword,
			role: RoleUser.ADMIN,
		})),
	});

	// Crear Empleadores con Compañías asociadas
	const employerPassword = await bcrypt.hash("employer123", saltRounds);
	const employers = await Promise.all(
		Array.from({ length: 10 }).map(async () => {
			const user = await prisma.user.create({
				data: {
					name: faker.person.fullName(),
					email: faker.internet.email(),
					hashedPassword: employerPassword,
					role: RoleUser.EMPLOYER,
				},
			});

			// Crear compañía con el mismo ID del usuario
			await prisma.company.create({
				data: {
					userId: user.id, // El ID del usuario como ID de la compañía
					name: faker.company.name(),
					description: faker.company.catchPhrase(),
					location: faker.location.city(),
					openPositions: faker.number.int({ min: 1, max: 20 }),
					logo: faker.image.url(), // Puedes ajustar para usar un URL válido
					phone: faker.phone.number(),
					email: faker.internet.email(),
					bio: faker.lorem.paragraph(),
				},
			});

			return user;
		}),
	);

	// Crear Categorías de Trabajos
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
				data: { name },
			}),
		),
	);

	// Crear Empleos asociados a empleadores y categorías
	const jobs = await Promise.all(
		Array.from({ length: 20 }).map(() => {
			const employer = faker.helpers.arrayElement(employers);
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
					salary: `$${faker.number.int({ min: 50000, max: 150000 })} - $${faker.number.int(
						{
							min: 150000,
							max: 300000,
						},
					)} al año`,
					location: faker.location.city(),
					userId: employer.id,
					companyUserId: employer.id, // Relación con la compañía del mismo empleador
					categoryJobId: category.id,
					applicationStatus: ApplicationStatus.PENDING,
					isActive,
					isArchived,
					isFeatured,
					isDeleted,
				},
			});
		}),
	);

	// Crear Empleados
	const employeePassword = await bcrypt.hash("employee123", saltRounds);
	const employees = await Promise.all(
		Array.from({ length: 15 }).map(() =>
			prisma.user.create({
				data: {
					name: faker.person.fullName(),
					email: faker.internet.email(),
					hashedPassword: employeePassword,
					role: RoleUser.EMPLOYEE,
				},
			}),
		),
	);

	// Crear Postulaciones de empleados a trabajos
	await Promise.all(
		Array.from({ length: 50 }).map(() => {
			const employee = faker.helpers.arrayElement(employees);
			const job = faker.helpers.arrayElement(jobs);

			return prisma.application.create({
				data: {
					dateApplied: faker.date.anytime(),
					userId: employee.id,
					jobId: job.id,
					status: faker.helpers.arrayElement([
						ApplicationStatus.PENDING,
						ApplicationStatus.REVIEWED,
						ApplicationStatus.REJECTED,
						ApplicationStatus.ACCEPTED,
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
