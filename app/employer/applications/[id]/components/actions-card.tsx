"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { ApplicationStatus } from "@prisma/client";
import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { getStatusColor } from "../../components/job-applications-table";

interface ActionsCardProps {
	applicationId: string;
	status: ApplicationStatus;
	comments?: string[];
}

export function ActionsCard({
	applicationId,
	status,
	comments: initialComments,
}: ActionsCardProps) {
	console.log("Application ID:", applicationId);

	const [currentStatus, setCurrentStatus] = useState(status);
	const [comments, setComments] = useState(initialComments);
	const [newComment, setNewComment] = useState("");

	const handleAccept = async () => {
		// In a real application, you would call an API to update the status
		setCurrentStatus("ACCEPTED");
	};

	const handleReject = async () => {
		// In a real application, you would call an API to update the status
		setCurrentStatus("REJECTED");
	};

	const handleAddComment = async () => {
		// In a real application, you would call an API to add a comment
	};

	return (
		<Card className="md:col-span-2">
			<CardHeader>
				<CardTitle>Application Status and Actions</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					<div className="flex items-center space-x-2">
						<span className="font-semibold">Current Status:</span>
						<Badge className={getStatusColor(currentStatus)}>
							{currentStatus}
						</Badge>
					</div>
					<div className="flex space-x-2">
						<Button
							onClick={handleAccept}
							disabled={currentStatus !== "PENDING"}
						>
							<CheckCircle2 className="mr-2 h-4 w-4" />
							Accept
						</Button>
						<Button
							onClick={handleReject}
							variant="destructive"
							disabled={currentStatus !== "PENDING"}
						>
							<XCircle className="mr-2 h-4 w-4" />
							Reject
						</Button>
					</div>
					<div className="space-y-2">
						<h3 className="font-semibold">Comments</h3>
						{/* {comments.map((comment) => (
							<div key={comment} className="rounded bg-muted p-2">
								{comment}
							</div>
						))} */}
						<Textarea
							placeholder="Add a comment..."
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
						/>
						<Button onClick={handleAddComment}>Add Comment</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
