import React from "react";
import HomeHeroIcon from "@/assets/Home-HeroLogo.png";
import Image from "@/components/Image/image";
import { IoClose } from "react-icons/io5";
import { useTheme } from "@/context/ThemeContext";
interface MobileSideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSideBar: React.FC<MobileSideBarProps> = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`fixed top-0 right-0 h-full w-9/12 ${isDarkMode?'bg-gray-800 text-gray-100':'bg-white text-gray-700'} shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between w-full items-center ">
          <Image
            src={HomeHeroIcon}
            alt="Home Hero Icon"
            className="h-8 w-20 mb-4"
          />
          <button onClick={onClose} className=" text-sm mb-4">
            <IoClose size={32} />
          </button>
        </div>
        <div className="space-y-2  size-10">Loading....</div>
      </div>
    </div>
  );
};

export default MobileSideBar;
