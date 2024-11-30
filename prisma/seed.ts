import { faker } from "@faker-js/faker";
import {
	ApplicationStatus,
	PrismaClient,
	RoleUser,
	TypeJob,
} from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

function generateRandomDateInMonth(year: number, month: number) {
	// Generar el inicio y fin del mes
	const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);

	// Generar una fecha aleatoria usando faker.date.past, asegurando que esté dentro del mes
	return faker.date.past({ years: 1, refDate: endOfMonth });
}

async function main() {
	console.log("Seeding database...");

	const currentYear = new Date().getFullYear();

	const saltRounds = 10;

	// Crear Administradores
	const adminPassword = await bcrypt.hash("admin123", saltRounds);
	await prisma.user.createMany({
		data: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(
			() => ({
				createdAt: generateRandomDateInMonth(
					currentYear,
					faker.number.int({ min: 0, max: 11 }), // Mes aleatorio
				),
				name: faker.person.fullName(),
				email: faker.internet.email(),
				hashedPassword: adminPassword,
				role: RoleUser.ADMIN,
			}),
		),
	});

	// Crear Empleadores con Compañías asociadas
	const employerPassword = await bcrypt.hash("employer123", saltRounds);
	const employers = await Promise.all(
		Array.from({ length: faker.number.int({ min: 5, max: 50 }) }).map(
			async () => {
				const createdAt = generateRandomDateInMonth(
					currentYear,
					faker.number.int({ min: 0, max: 11 }),
				);
				const user = await prisma.user.create({
					data: {
						createdAt,
						name: faker.person.fullName(),
						email: faker.internet.email(),
						hashedPassword: employerPassword,
						role: RoleUser.EMPLOYER,
					},
				});

				// Crear compañía con el mismo ID del usuario
				await prisma.company.create({
					data: {
						createdAt,
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
			},
		),
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

	// Crear Empleos asociados a empleadores, categorías, requisitos y contactos
	const jobs = await Promise.all(
		Array.from({ length: faker.number.int({ min: 5, max: 50 }) }).map(
			async () => {
				const employer = faker.helpers.arrayElement(employers);
				const category = faker.helpers.arrayElement(categories);

				const job = await prisma.job.create({
					data: {
						createdAt: generateRandomDateInMonth(
							currentYear,
							faker.number.int({ min: 0, max: 11 }),
						),
						title: faker.person.jobTitle(),
						description: faker.lorem.paragraph(),
						salary: `$${faker.number.int({ min: 50000, max: 150000 })} - $${faker.number.int({ min: 150000, max: 300000 })} al año`,
						location: faker.location.city(),
						userId: employer.id,
						companyUserId: employer.id,
						categoryJobId: category.id,
						applicationStatus: ApplicationStatus.PENDING,
						type: faker.helpers.arrayElement(Object.values(TypeJob)),
						isActive: faker.datatype.boolean(),
						isFeatured: faker.datatype.boolean(),
					},
				});

				// Crear Requisitos para el empleo
				await Promise.all(
					Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() =>
						prisma.requirements.create({
							data: {
								name: faker.lorem.words(3),
								jobId: job.id,
							},
						}),
					),
				);

				// Crear Información de Contacto para el empleo
				await prisma.contactInfo.create({
					data: {
						email: faker.internet.email(),
						phone: faker.phone.number(),
						website: faker.internet.url(),
						linkedin: `https://linkedin.com/in/${faker.internet.displayName()}`,
						facebook: `https://facebook.com/${faker.internet.displayName()}`,
						instagram: `https://instagram.com/${faker.internet.displayName()}`,
						jobId: job.id,
					},
				});

				return job;
			},
		),
	);

	// Crear Empleados
	const employeePassword = await bcrypt.hash("employee123", saltRounds);
	const employees = await Promise.all(
		Array.from({ length: faker.number.int({ min: 5, max: 50 }) }).map(() =>
			prisma.user.create({
				data: {
					createdAt: generateRandomDateInMonth(
						currentYear,
						faker.number.int({ min: 0, max: 11 }),
					),
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
		Array.from({ length: faker.number.int({ min: 5, max: 50 }) }).map(() => {
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
