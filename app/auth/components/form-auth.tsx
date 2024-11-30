"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { FormRegister } from "../components/form-register";
import { FormLogin } from "./form-login";

type FormAuthProps = {
	type?: "register" | "login";
};

export const FormAuth: React.FC<FormAuthProps> = ({ type }) => {
	const [activeTab, setActiveTab] = useState(type || "register");

	useEffect(() => {
		if (type) {
			setActiveTab(type);
		}
	}, [type]);

	return (
		<CardContent>
			<Tabs defaultValue={activeTab}>
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="register">Registrarse</TabsTrigger>
					<TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
				</TabsList>
				<TabsContent value="register">
					<FormRegister />
				</TabsContent>
				<TabsContent value="login">
					<FormLogin />
				</TabsContent>
			</Tabs>
		</CardContent>
	);
};
