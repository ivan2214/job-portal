import NewVerificationForm from "@/app/auth/components/new-verification-form";

interface NewVerificationPageProps {
	searchParams: {
		token: string;
	};
}

const NewVerificationPage: React.FC<NewVerificationPageProps> = ({
	searchParams,
}) => {
	const { token } = searchParams;

	return <NewVerificationForm token={token} />;
};

export default NewVerificationPage;
