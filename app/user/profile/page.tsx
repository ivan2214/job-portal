import { Container } from "@/components/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplicationManagement } from "./components/application-management";
import { PasswordChange } from "./components/password-change";
import { PersonalInfo } from "./components/personal-info";
import { ResumeUpload } from "./components/resume-upload";
import { prisma } from "@/db";
import { notFound } from "next/navigation";

export default async function ProfilePage() {
	const userId = "cm43ejow7006muct4i0mo17f6";

	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		include: {
			applications: {
				include: {
					job: {
						include: {
							company: true,
						},
					},
				},
			},
		},
	});

	if (!user) {
		return notFound();
	}

	return (
		<Container>
			<h1 className="mb-6 font-bold text-3xl">Perfil de Usuario</h1>
			<Tabs defaultValue="personal-info">
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="personal-info">Información Personal</TabsTrigger>
					<TabsTrigger value="password">Contraseña</TabsTrigger>
					<TabsTrigger value="resume">Currículum</TabsTrigger>
					<TabsTrigger value="applications">Postulaciones</TabsTrigger>
				</TabsList>
				<TabsContent value="personal-info">
					<PersonalInfo user={user} />
				</TabsContent>
				<TabsContent value="password">
					<PasswordChange user={user} />
				</TabsContent>
				<TabsContent value="resume">
					<ResumeUpload />
				</TabsContent>
				<TabsContent value="applications">
					<ApplicationManagement user={user} />
				</TabsContent>
			</Tabs>
		</Container>
	);
}
