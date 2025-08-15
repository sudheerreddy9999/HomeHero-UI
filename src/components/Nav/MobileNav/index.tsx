"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuBookCheck } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import Image from "@/components/Image/image";
import { useTheme } from "@/context/ThemeContext";
import { useAppSelector } from "@/hooks/useAppSelector";
import HomeLogo from "@/assets/home-hero-icon.png";
import chatBotIcon from "@/assets/chatbot-icon.png";
import ChatBody from "@/components/ChatBot/ChatBody";

const MobileNav = () => {
  const pathname = usePathname();
  const { isDarkMode } = useTheme();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const {cartItems} = useAppSelector((state)=>state.cart);

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: <Image src={HomeLogo} alt="Home" className="w-6 h-6" />,
      count: 0,
    },
    { href: "/bookings", label: "Bookings", icon: <LuBookCheck size={24} />, count: 0 },
    { href: "/cart", label: "Cart", icon: <IoCartOutline size={24} />, count: cartItems.length },
    { href: "/acount", label: "Account", icon: <MdManageAccounts size={24} />, count: 0 },
  ];

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 ${
        isDarkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-gray-700 border-t border-gray-200"
      } dark:border-gray-700 z-50 md:hidden flex justify-between items-center px-6 py-2 shadow-md`}
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex flex-col items-center text-xs relative ${
            pathname === item.href
              ? "text-blue-600"
              : `${isDarkMode ? "text-gray-100" : "text-gray-500"}`
          }`}
        >
          <div className="relative">
            {item.icon}
            {item.count > 0 && (
              <span className={`absolute -top-2 -right-2 ${isDarkMode?'bg-white text-black':'bg-gray-200 text-gray-800'}  text-[12px] font-bold rounded-full w-4 h-4 flex items-center justify-center`}>
                {item.count}
              </span>
            )}
          </div>
          <span>{item.label}</span>
        </Link>
      ))}

      {/* Chat Icon */}
      <div
        className={`flex flex-col items-center text-xs ${
          isDarkMode ? "text-gray-100" : "text-gray-500"
        }`}
        onClick={() => setIsChatOpen((prev) => !prev)}
      >
        <div className="relative">
          <Image src={chatBotIcon} alt="Chat" className="w-6 h-6" />
        </div>
        <span>Chat</span>
      </div>

      {isChatOpen && <ChatBody />}
    </div>
  );
};

export default MobileNav;
