import React, { useState } from "react";
import Image from "../Image/image";
import BotIcon from "@/assets/chatbot.png";
import useIsMobile from "@/hooks/useIsMobile";
import ChatBody from "./ChatBody";

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div
      className={`fixed ${
        isMobile ? "bottom-18" : "bottom-6"
      } right-4 z-50  bg-transparent `}
    >
      <div
        className={`relative bg-transparent ${
          isMobile ? "size-10" : "size-10"
        }   cursor-pointer`}
        role="button"
        tabIndex={0}
        onClick={() => setIsChatOpen((prev) => !prev)}
      >
        <Image src={BotIcon} alt="BotIcon" fill className="object-contain" />
      </div>

      {isChatOpen && <ChatBody />}
    </div>
  );
};

export default ChatBot;
