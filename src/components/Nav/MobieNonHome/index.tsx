import React, { useState } from "react";
import { useRouter } from "next/router";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearchOutline, IoArrowBack } from "react-icons/io5";
import MobileSideBar from "@/components/Profile/SideBar";
import MobileHomeSearch from "@/components/Profile/Search";
import { useTheme } from "@/context/ThemeContext";

const MobileNonHome = () => {
  const router = useRouter();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isDarkMode } = useTheme();

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <div
        className={`fixed top-0 left-0 w-full z-50 ${
          isDarkMode ? "bg-gray-800 text-gray-100" : " bg-white text-gray-700"
        }  shadow flex items-center justify-between px-4 py-3`}
      >
        <div className="flex items-center space-x-4">
          <button onClick={handleBack}>
            <IoArrowBack size={24} />
          </button>
          <h1 className="text-lg font-semibold">Selected AC Services</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="text-gray-800"
            onClick={() => {
              setIsSearchOpen(true);
              setIsSideBarOpen(false);
            }}
          >
            <IoSearchOutline
              size={24}
              className={`${isDarkMode ? "text-gray-100" : "text-gray-700"}`}
            />
          </button>
          <button
            onClick={() => {
              setIsSideBarOpen(true);
              setIsSearchOpen(false);
            }}
          >
            <RxHamburgerMenu
              size={24}
              className={`${isDarkMode ? "text-gray-100" : "text-gray-700"}`}
            />
          </button>
        </div>
      </div>
      <MobileSideBar
        isOpen={isSideBarOpen}
        onClose={() => setIsSideBarOpen(false)}
      />
      <MobileHomeSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
};

export default MobileNonHome;
