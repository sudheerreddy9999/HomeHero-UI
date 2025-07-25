import React from "react";
import { useTheme } from "@/context/ThemeContext";
import useIsMobile from "@/hooks/useIsMobile";
import { IoArrowBack } from "react-icons/io5";

import { FiArrowUpRight } from "react-icons/fi";

interface MobileHomeSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileHomeSearch: React.FC<MobileHomeSearchProps> = ({
  isOpen,
  onClose,
}) => {
  const { isDarkMode } = useTheme();
  const isMobile = useIsMobile();
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full ${isDarkMode?'bg-gray-800 text-gray-100':'bg-white text-gray-700'} shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 px-2">
           <div className="relative w-full">
                      <IoArrowBack
                        size={24}
                        onClick={onClose}
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
                        className={`w-full  border-2 text-sm sm:text-[15px] pl-12 pr-4 py-3 mt-0 rounded-xl  ${
                          isDarkMode
                            ? "bg-gray-800 text-white"
                            : " bg-white border border-gray-300 text-gray-700"
                        } z-10 relative`}
                      />
                      <div className=" p-1.5 sm:p-2 rounded-full absolute right-1 top-1/2 transform -translate-y-1/2 z-20">
                        <FiArrowUpRight size={24}  />
                      </div>
                    </div>
      </div>
    </div>
  );
};

export default MobileHomeSearch;
