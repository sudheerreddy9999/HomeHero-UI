import React, { useState, useRef, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FiArrowUpRight } from "react-icons/fi";
import DynamicText from "./DynamicText";
import Image from "@/components/Image/image"
import useIsMobile from "@/hooks/useIsMobile";
import sofaImage from "@/assets/sofa.jpeg";
import MobileViewSofa from "@/assets/sofa-mobile.jpeg";
import darkModeSofaImage from "@/assets/darkSofa.webp";
import darkMobileSOfa from "@/assets/sofadarkMb.webp";
import { useTheme } from "@/context/ThemeContext";
import SearchModel from "@/components/Search"

const BannerSection = () => {
  const [opensearchModel, setOpenSearchModel] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { isDarkMode } = useTheme();
  const getSofaImage = () => {
    if (isMobile) {
      if (isDarkMode) return darkMobileSOfa;
      return MobileViewSofa;
    }
    if (isDarkMode) return darkModeSofaImage;
    return sofaImage;
  };
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenSearchModel(false);
      }
    };

    if (opensearchModel) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [opensearchModel]);
  const handleInputClick = () => {
    setOpenSearchModel(true);
  };
  return (
    <>
      {opensearchModel && (
        <div className="fixed inset-0 w-full bg-opacity-90 flex mt-16 justify-center  z-50 transition-opacity duration-300 ease-in-out">
          <div
            className={`transform transition-all duration-300 ease-in-out scale-95  animate-fadeInUp flex flex-col ${isDarkMode?'bg-gray-900':'bg-white'}    w-[100%] sm:w-[55%] py-4 pt-7 h-10/12 rounded-2xl shadow-2xl `}
            ref={modalRef}
          >
            <SearchModel />
          </div>
        </div>
      )}
      <div className="relative  w-full h-[55vh] sm:h-[65vh]">
        <Image
          src={getSofaImage()}
          className="w-full h-full object-center sm:rounded-b-2xl"
          alt="Background"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center  bg-opacity-30">
          <h1 className={`text-3xl sm:text-4xl font-bold text-white`}>
            Welcome to HomeHero
          </h1>
          {/* <p className="text-lg text-white mt-2">
            Your satisfaction is our priority
          </p> */}
          <DynamicText />
          <div className="relative w-3/4 sm:w-[36%] mt-4">
            <CiSearch
              size={24}
              className={`absolute left-4 ${
                isDarkMode ? "text-white" : "text-gray-700"
              }  top-1/2 transform -translate-y-1/2  z-20`}
            />
            <input
              type="text"
              placeholder={
                isMobile
                  ? "How Can We Help You Today?"
                  : 'Search for Services, "AC Repair", "Plumber", "Electrician" etc...'
              }
              className={`w-full text-sm sm:text-[15px] pl-12 pr-4 py-3 mt-0 rounded-full focus:outline-none ${
                isDarkMode
                  ? "bg-gray-800 text-white"
                  : " bg-white border border-gray-300 text-gray-700"
              } z-10 relative`}
              onClick={handleInputClick}
            />
            <div className="bg-blue-400 p-1.5 sm:p-2 rounded-full absolute right-1 top-1/2 transform -translate-y-1/2 z-20">
              <FiArrowUpRight size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerSection;
