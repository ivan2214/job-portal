import NewVerificationForm from "@/app/(routes)/auth/components/new-verification-form";

type SearchParams = Promise<{
	token?: string;
}>;

const NewVerificationPage = async ({
	searchParams,
}: {
	searchParams: SearchParams;
}) => {
	const params = await searchParams;

	const token = typeof params.token === "string" ? params.token : "";

	return <NewVerificationForm token={token} />;
};

export default NewVerificationPage;
