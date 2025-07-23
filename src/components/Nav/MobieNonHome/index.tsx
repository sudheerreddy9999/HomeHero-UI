import React, { useState } from "react";
import { useRouter } from "next/router";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearchOutline, IoArrowBack } from "react-icons/io5";
import MobileSideBar from "@/components/Profile/SideBar";
import MobileHomeSearch from "@/components/Profile/Search";

const MobileNonHome = () => {
  const router = useRouter();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <button className="text-gray-800" onClick={handleBack}>
            <IoArrowBack size={24} />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            Selected AC Services
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-800" onClick={() => {
            setIsSearchOpen(true);
            setIsSideBarOpen(false);
          }}>
            <IoSearchOutline size={24} />
          </button>
          <button onClick={() => {
            setIsSideBarOpen(true);
            setIsSearchOpen(false);
          }}>
            <RxHamburgerMenu size={24} />
          </button>
        </div>
      </div>
      <MobileSideBar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />
      <MobileHomeSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default MobileNonHome;
