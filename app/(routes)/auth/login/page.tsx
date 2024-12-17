import { LoginForm } from "@/app/(routes)/auth/components/login-form";
import { Suspense } from "react";

const LoginPage = () => {
	return <Suspense fallback={<div>Loading...</div>}>{<LoginForm />}</Suspense>;
};

export default LoginPage;
