"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const WithdrawApplication = () => {
	const [isWithdrawing, setIsWithdrawing] = useState(false);

	const handleWithdraw = async () => {
		setIsWithdrawing(true);
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API call
		setIsWithdrawing(false);
		alert("Application withdrawn successfully");
	};

	return (
		<div>
			<Button onClick={handleWithdraw} disabled={isWithdrawing}>
				{isWithdrawing ? "Withdrawing..." : "Withdraw Application"}
			</Button>
		</div>
	);
};

export default WithdrawApplication;
