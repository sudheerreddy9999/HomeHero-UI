import React from "react";
import Link from "next/link";

const Bookings = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center  bg-white text-center px-4">
      <h1 className="text-5xl font-bold text-gray-800">No Bookings Found</h1>
      <p className="text-sm text-gray-600 mt-4 w-96 mb-6">
        You don’t have any bookings at the moment. Once you make a booking, it
        will appear here for easy tracking and management.
      </p>
      <Link href="/" className=" p-2 border-2 border-[#53c9c2]  rounded-lg cursor-pointer  hover:-translate-y-0.5  text-[15px]">
        Go to Homepage
      </Link>
    </div>
  );
};

export default Bookings;
