import React from "react";
import { useTheme } from "@/context/ThemeContext";

interface MobileHomeSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileHomeSearch: React.FC<MobileHomeSearchProps> = ({
  isOpen,
  onClose,
}) => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full ${isDarkMode?'bg-gray-800 text-gray-100':'bg-white text-gray-700'} shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Search</h2>
          <button onClick={onClose} className="text-sm ">
            Close
          </button>
        </div>
        <div className="mt-4">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default MobileHomeSearch;
