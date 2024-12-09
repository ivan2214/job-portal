import { Footer } from "@/components/footer";
import { Header } from "@/layouts/header";
import type { ReactNode } from "react";
interface RoutesLayoutFormProps {
	children: ReactNode;
}

const RoutesLayout: React.FC<RoutesLayoutFormProps> = ({ children }) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default RoutesLayout;
