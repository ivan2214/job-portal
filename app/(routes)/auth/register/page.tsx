import { RegisterForm } from "@/app/(routes)/auth/components/register-form";
import { Suspense } from "react";

const RegisterPage = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<RegisterForm />
		</Suspense>
	);
};

export default RegisterPage;
