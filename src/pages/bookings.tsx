import React from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

const Bookings = () => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }   text-center px-4`}
    >
      <h1 className="text-3xl md:text-5xl font-bold ">No Bookings Found</h1>
      <p className="text-sm text-gray-600 mt-4 w-11/12 md:w-96 mb-6">
        You don’t have any bookings at the moment. Once you make a booking, it
        will appear here for easy tracking and management.
      </p>
      <Link
        href="/"
        className=" p-2 border-2 border-[#53c9c2]  rounded-lg cursor-pointer  hover:-translate-y-0.5 text-xs md:text-[15px]"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default Bookings;
