"use client";

import { useCallback, useEffect, useState, useTransition } from "react";

import { newVerification } from "@/actions/new-verification";
import { CardWrapper } from "@/app/auth/components/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Circle } from "lucide-react";

const NewVerificationForm = ({ token }: { token: string }) => {
	const [error, setError] = useState<string | undefined>(undefined);
	const [success, setSuccess] = useState<string | undefined>(undefined);
	const [isPending, startTransition] = useTransition();
	const [isVerified, setIsVerified] = useState<boolean>(false); // Nuevo estado para verificar si ya se realizó la verificación

	const onSubmit = useCallback(() => {
		if (!token) {
			setError("Missing Token!");

			return;
		}

		if (isVerified) {
			return; // No hacer nada si ya se verificó
		}

		startTransition(() => {
			newVerification(token)
				.then((data) => {
					if (data?.error) {
						setError(data?.error);
						setSuccess(undefined);
					}
					if (data?.success) {
						setSuccess(data?.success);
						setError(undefined);
					}
				})
				.catch((e) => setError(e.message));
		});
	}, [token, isVerified]);

	useEffect(() => {
		// Llama a onSubmit solo una vez cuando el componente se monta
		if (!isVerified) {
			onSubmit();
			setIsVerified(true);
		}
	}, [isVerified, onSubmit]);

	return (
		<CardWrapper
			backButtonHref="/auth/login"
			backButtonLabel="Volver a iniciar sesión"
			headderLabel={
				isVerified
					? "Verificación de correo electronico completada"
					: "Verificación de correo electronico"
			}
		>
			<div className="flex w-full items-center justify-center">
				{isPending ? <Circle className="animate-spin" /> : null}
				{success && !isPending && !error ? (
					<FormSuccess message={success} />
				) : null}
				{error && !success && !isPending ? <FormError message={error} /> : null}
			</div>
		</CardWrapper>
	);
};

export default NewVerificationForm;
