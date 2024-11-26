import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalInfo } from "./personal-info";
import { PasswordChange } from "./password-change";
import { ResumeUpload } from "./resume-upload";
import { ApplicationManagement } from "./application-management";

export default function ProfilePage() {
	return (
		<div className="container mx-auto py-10">
			<h1 className="mb-6 font-bold text-3xl">Perfil de Usuario</h1>
			<Tabs defaultValue="personal-info">
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="personal-info">Información Personal</TabsTrigger>
					<TabsTrigger value="password">Contraseña</TabsTrigger>
					<TabsTrigger value="resume">Currículum</TabsTrigger>
					<TabsTrigger value="applications">Postulaciones</TabsTrigger>
				</TabsList>
				<TabsContent value="personal-info">
					<PersonalInfo />
				</TabsContent>
				<TabsContent value="password">
					<PasswordChange />
				</TabsContent>
				<TabsContent value="resume">
					<ResumeUpload />
				</TabsContent>
				<TabsContent value="applications">
					<ApplicationManagement />
				</TabsContent>
			</Tabs>
		</div>
	);
}
