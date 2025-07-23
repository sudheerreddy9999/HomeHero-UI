import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import ChatConvo from "../ChatConvo";
import { MdOutlineRefresh } from "react-icons/md";
import { BiLike, BiDislike } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import { useAppSelector } from "@/hooks/useAppSelector";
import { sendMessageAction } from "@/store/actions/chat-bot";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/config/store";

const ChatBody = () => {
  const { isDarkMode } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [userInputMessage, setUserInputMessage] = useState("");
  const { enableSendButton, sessionId } = useAppSelector(
    (state) => state.chatBot
  );
  const handleSendMessage = () => {
    try {
      setUserInputMessage("");
      dispatch(
        sendMessageAction({ text: userInputMessage, sessionId: sessionId })
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <div
      className={`absolute bottom-20 sm:bottom-12 right-2 sm:right-0 ${
        isDarkMode ? "bg-gray-800" : "bg-white "
      } shadow-xl rounded-lg w-[375px]  sm:w-[400px]`}
    >
      <div
        className={`${
          isDarkMode ? "bg-gray-900 text-white" : "bg-[#53c9c2] text-gray-700"
        } p-4 w-full  rounded-lg rounded-b-none`}
      >
        <h2 className="text-lg font-semibold mb-1">
          HomeHero AI Chat Assistant
        </h2>
        <p
          className={`text-[13px] ${
            isDarkMode ? "text-gray-400" : "text-gray-700"
          } `}
        >
          Instant Smart Support, Right When You Need It
        </p>
      </div>
      <ChatConvo />
      <div
        className={`border-t border-gray-300 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
        } rounded-lg rounded-t-none  px-4 py-3 flex flex-col gap-2 `}
      >
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
          <p
            className={`text-xs ${isDarkMode ? "text-white" : "text-gray-700"}`}
          >
            Powered by HomeHero
          </p>
        </div>
      </div>
    </div>
  );
};
export default ChatBody;
