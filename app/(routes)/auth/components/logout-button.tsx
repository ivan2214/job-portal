"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";

interface LogoutButtonProps {
	children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
	const onClick = () => {
		logout();
	};

	return (
		<Button className="cursor-pointer" onClick={onClick}>
			{children}
		</Button>
	);
};
