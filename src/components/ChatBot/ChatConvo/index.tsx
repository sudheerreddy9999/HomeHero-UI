import React from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
interface Message {
  id: string;
  text: string;
  userType: "user" | "bot";
}

const ChatConvo = () => {
  const { messages, loading } = useAppSelector((state) => state.chatBot);

  return (
    <div className="p-4 min-h-[220px] max-h-[300px] overflow-y-auto w-full space-y-4 custom-scrollbar">
      {messages.map((message: Message) => (
        <div
          key={message.id}
          className={`flex ${
            message.userType === "bot" ? "justify-start" : "justify-end"
          }`}
        >
          <div
            className={`p-3 rounded-md max-w-xs ${
              message.userType === "bot"
                ? "bg-gray-100 text-gray-700"
                : "bg-blue-100 text-gray-700"
            }`}
          >
            <p className="text-[12.5px]">{message.text}</p>
          </div>
        </div>
      ))}
      {loading && messages[messages.length - 1]?.userType === "user" && (
        <div className="flex justify-start">
          <div className="p-1 px-4 rounded-md max-w-xs">
            <span className="loading loading-dots loading-xl text-gray-700"></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatConvo;
