import React from "react";
import Image from "../Image/image";
import Icon from "../../assets/home-hero-icon.png";

const Loader = () => {
  return (
    <>
      <div className="fixed inset-0 w-full bg-opacity-90 flex items-center justify-center z-50">
        <div className="flex flex-col justify-center items-center">
          <Image src={Icon} className="w-20  animate-bounce" alt="Loader" />
          <div className="flex">
            <p className="text-xl text-gray-600 px-2 font-semibold">Loading</p>
            <span className="loading loading-dots  loading-xl"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
