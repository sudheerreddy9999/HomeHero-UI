import React from "react";
import { CiSearch } from "react-icons/ci";
import { FiArrowUpRight } from "react-icons/fi";
import DynamicText from "./DynamicText";
import Image from "../Image/image";
import sofaImage from "@/assets/sofa.jpeg"

const BannerSection = () => {
  return (
    <>
      <div className="relative w-full h-[65vh]">
        <Image
          src={sofaImage}
          className="w-full h-full object-fill rounded-b-2xl"
          alt="Background"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center  bg-opacity-30">
          <h1 className="text-4xl font-bold text-white">Welcome to HomeHero</h1>
          {/* <p className="text-lg text-white mt-2">
            Your satisfaction is our priority
          </p> */}
          <DynamicText />
          <div className="relative w-3/4 sm:w-[36%] mt-4">
            <CiSearch
              size={24}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
            />
            <input
              type="text"
              placeholder='Search for Services, "AC Repair", "Plumber", "Electrician"'
              className="w-full pl-12 mt-2 pr-4 py-3 bg-white border border-gray-300 rounded-full focus:outline-none"
            />
            <div className="bg-blue-400  p-2 rounded-full absolute right-1 -bottom-4 transform -translate-y-1/2">
              <FiArrowUpRight
                size={24}
                className="rounded-full  text-white z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerSection;
