import { faker } from "@faker-js/faker";
import {
  ApplicationStatus,
  PrismaClient,
  RoleUser,
  TypeJob,
  UserStatus,
} from "@prisma/client";
import bcrypt from "bcryptjs";

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
          faker.number.int({ min: 0, max: 11 }) // Mes aleatorio
        ),
        image: faker.image.avatar(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        hashedPassword: adminPassword,
        role: RoleUser.ADMIN,
        emailVerified: new Date(),
      })
    ),
  });

  // Crear usuarios como compañias
  const companiesPassword = await bcrypt.hash("compañia123", saltRounds);

  const companies = await Promise.all(
    Array.from({ length: faker.number.int({ min: 5, max: 50 }) }).map(
      async () => {
        const createdAt = generateRandomDateInMonth(
          currentYear,
          faker.number.int({ min: 0, max: 11 })
        );
        const userCompany = await prisma.user.create({
          data: {
            createdAt,
            image: faker.image.avatar(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            hashedPassword: companiesPassword,
            role: RoleUser.COMPANY,
            emailVerified: Math.random() < 0.5 ? new Date() : null,
          },
        });

        // Crear compañía con el mismo ID del usuario
        await prisma.company.create({
          data: {
            createdAt,
            userId: userCompany.id, // El ID del usuario como ID de la compañía
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

        return userCompany;
      }
    )
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
      })
    )
  );

  // Crear Empleos asociados a companías, categorías, requisitos y contactos
  const jobs = await Promise.all(
    Array.from({ length: faker.number.int({ min: 5, max: 50 }) }).map(
      async () => {
        const company = faker.helpers.arrayElement(companies);
        const category = faker.helpers.arrayElement(categories);

        const job = await prisma.job.create({
          data: {
            createdAt: generateRandomDateInMonth(
              currentYear,
              faker.number.int({ min: 0, max: 11 })
            ),
            title: faker.person.jobTitle(),
            description: faker.lorem.paragraph(),
            salary: `$${faker.number.int({
              min: 50000,
              max: 150000,
            })} - $${faker.number.int({ min: 150000, max: 300000 })} al año`,
            location: faker.location.city(),
            companyUserId: company.id,
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
            })
          )
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
      }
    )
  );

  // Crear usuarios
  const userPassword = await bcrypt.hash("user123", saltRounds);
  const users = await Promise.all(
    Array.from({ length: faker.number.int({ min: 5, max: 50 }) }).map(() =>
      prisma.user.create({
        data: {
          createdAt: generateRandomDateInMonth(
            currentYear,
            faker.number.int({ min: 0, max: 11 })
          ),
          emailVerified: Math.random() < 0.5 ? new Date() : null,
          image: faker.image.avatar(),
          name: faker.person.fullName(),
          email: faker.internet.email(),
          hashedPassword: userPassword,
          role: RoleUser.USER,
          status: faker.helpers.arrayElement(Object.values(UserStatus)),
        },
      })
    )
  );

  // Crear Postulaciones de usuarios a trabajos
  await Promise.all(
    Array.from({ length: faker.number.int({ min: 5, max: 50 }) }).map(() => {
      const user = faker.helpers.arrayElement(users);
      const job = faker.helpers.arrayElement(jobs);

      return prisma.application.create({
        data: {
          dateApplied: faker.date.anytime(),
          userId: user.id,
          jobId: job.id,
          status: faker.helpers.arrayElement([
            ApplicationStatus.PENDING,
            ApplicationStatus.REVIEWED,
            ApplicationStatus.REJECTED,
            ApplicationStatus.ACCEPTED,
          ]),
        },
      });
    })
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
