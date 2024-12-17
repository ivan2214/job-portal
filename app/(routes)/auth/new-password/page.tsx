import { NewPasswordForm } from "@/app/(routes)/auth/components/new-password-form";
import { Suspense } from "react";

const NewPasswordPage = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<NewPasswordForm />
		</Suspense>
	);
};

export default NewPasswordPage;
