"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function MessageThread({
	applicationId,
}: { applicationId: string }) {
	console.log("Application ID:", applicationId);

	const [messages, setMessages] = useState([
		{
			id: 1,
			sender: "Admin",
			content: "Thank you for your application. We have a few questions.",
		},
		{
			id: 2,
			sender: "Applicant",
			content: "Sure, I'd be happy to answer any questions you have.",
		},
	]);
	const [newMessage, setNewMessage] = useState("");

	const handleSendMessage = () => {
		if (newMessage.trim()) {
			setMessages([
				...messages,
				{
					id: messages.length + 1,
					sender: "Admin",
					content: newMessage.trim(),
				},
			]);
			setNewMessage("");
			// Here you would typically make an API call to save the message
		}
	};

	return (
		<div>
			<div className="mb-4 space-y-4">
				{messages.map((message) => (
					<div
						key={message.id}
						className={`rounded-lg p-3 ${message.sender === "Admin" ? "ml-auto bg-blue-100" : "bg-gray-100"} max-w-[80%]`}
					>
						<p className="font-semibold">{message.sender}</p>
						<p>{message.content}</p>
					</div>
				))}
			</div>
			<div className="flex space-x-2">
				<Textarea
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					placeholder="Type your message here..."
					className="flex-grow"
				/>
				<Button onClick={handleSendMessage}>Send</Button>
			</div>
		</div>
	);
}
