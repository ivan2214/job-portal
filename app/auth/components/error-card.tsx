import { CardWrapper } from "@/app/auth/components/card-wrapper";
import { Triangle } from "lucide-react";

export const ErrorCard = () => {
	return (
		<CardWrapper
			backButtonHref="/auth/login"
			backButtonLabel="Back to Login"
			headderLabel="Oops! Something went wrong"
		>
			<div className="flex w-full items-center justify-center">
				<Triangle className="text-destructive" />
			</div>
		</CardWrapper>
	);
};
