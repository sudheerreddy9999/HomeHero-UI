import React, {  useState } from "react";
import Image from "../Image/image";
import BotIcon from "@/assets/chatbot-icon.png";
import { MdOutlineRefresh } from "react-icons/md";
import { BiLike, BiDislike } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import useIsMobile from "@/hooks/useIsMobile";
import { sendMessageAction } from "@/store/actions/chat-bot";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/config/store";
import { useAppSelector } from "@/hooks/useAppSelector";

import ChatConvo from "./ChatConvo";

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userInputMessage, setUserInputMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { enableSendButton,sessionId } = useAppSelector((state) => state.chatBot);
  const isMobile = useIsMobile();

  const handleSendMessage = () => {
    try {
      setUserInputMessage("");
      dispatch(sendMessageAction({ text: userInputMessage,sessionId: sessionId }));
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div
      className={`fixed ${isMobile ? "bottom-18" : "bottom-6"} right-6 z-50`}
    >
      <div
        className={`relative ${
          isMobile ? "size-9" : "size-10"
        }   cursor-pointer`}
        role="button"
        tabIndex={0}
        onClick={() => setIsChatOpen((prev) => !prev)}
      >
        <Image src={BotIcon} alt="BotIcon" fill className="object-contain" />
      </div>

      {isChatOpen && (
        <div className="absolute bottom-12 -right-4 sm:right-0 bg-white shadow-xl rounded-lg w-[375px]  sm:w-[400px] border border-gray-200">
          <div className="bg-[#53c9c2] p-4 w-full  rounded-lg rounded-b-none">
            <h2 className="text-lg font-semibold mb-1">
              HomeHero AI Chat Assistant
            </h2>
            <p className="text-[13px] text-gray-700">
              Instant Smart Support, Right When You Need It
            </p>
          </div>
          <ChatConvo />
          <div className="border-t border-gray-300 px-4 py-3 flex flex-col gap-2 mt-2">
            <div className="flex relative items-center space-x-2 mb-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={userInputMessage}
                onChange={(e) => setUserInputMessage(e.target.value)}
                readOnly={!enableSendButton} 
                className={`w-full p-1 rounded-md outline-none border-none cursor-text`}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    enableSendButton &&
                    userInputMessage.length > 0
                  ) {
                    handleSendMessage();
                    setUserInputMessage("");
                  }
                }}
              />
              {userInputMessage && enableSendButton && (
                <button
                  className=" absolute right-0 transition-colors cursor-pointer"
                  onClick={() => handleSendMessage()}
                >
                  <IoMdSend size={24} />
                </button>
              )}
            </div>
            <div className="flex  items-center justify-between">
              <div className="flex items-center space-x-2">
                <BiLike size={20} className="text-gray-500 cursor-pointer" />
                <BiDislike size={20} className="text-gray-500 cursor-pointer" />
                <MdOutlineRefresh
                  size={20}
                  className="text-gray-500 cursor-pointer"
                />
              </div>
              <p className="text-xs">Powered by HomeHero</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
