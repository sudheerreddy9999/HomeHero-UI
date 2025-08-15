import React from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
const UserCart = () => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
      }  text-center px-4`}
    >
      <h1 className="text-3xl md:text-5xl font-bold ">No Items Found</h1>
      <p className="text-sm text-gray-600 mt-4 w-72 md:w-96 mb-6">
        Your cart is empty right now. Items you add will show up here.
      </p>
      <Link
        href="/"
        className="p-2 border-2 border-[#53c9c2] rounded-lg cursor-pointer hover:-translate-y-0.5 text-xs sm:text-[15px]"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default UserCart;
