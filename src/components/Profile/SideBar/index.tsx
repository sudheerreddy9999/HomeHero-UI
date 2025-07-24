import React from "react";
import HomeHeroIcon from "@/assets/Home-HeroLogo.png";
import Image from "@/components/Image/image";
import { IoClose } from "react-icons/io5";
import { useTheme } from "@/context/ThemeContext";
import useIsMobile from "@/hooks/useIsMobile";
import Welcome from "@/components/Auth";

interface MobileSideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSideBar: React.FC<MobileSideBarProps> = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const isMobile = useIsMobile();
  const [openAuth, setOpenAuth] = React.useState(false);
  const handleOpenAuth = () => {
    console.log("Open Auth Modal");
    setOpenAuth(!openAuth);
  };
  const handlecloseAuth = () => {
    setOpenAuth(!openAuth);
  };

  return (
    <>
      {openAuth && <Welcome onAuthClose={handlecloseAuth} />}
      <div
        className={`fixed top-0 right-0 h-full w-9/12 ${
          isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
        } shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 w-full h-full flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <Image
                src={HomeHeroIcon}
                alt="Home Hero Icon"
                className="h-8 w-24"
              />
              <button onClick={onClose} className=" transition">
                <IoClose size={28} />
              </button>
            </div>
            <div
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-gray-50"
              }   p-3 flex flex-col space-y-3 items-center rounded-lg mb-4`}
            >
              <p className="text-sm dark:text-gray-300 text-center ">
                Please log in or sign up to track orders and get support.
              </p>
              <button
                className={` ${
                  isMobile ? " " : " w-24 h-9 text-xs"
                } border-[1px] ${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-[#53c9c2] text-gray-100 border-[#53c9c2]"
                }  flex justify-center items-center  rounded-4xl px-3 py-2 cursor-pointer hover:-translate-y-0.5 dark:text-black  dark:font-[500]  dark:bg-white`}
                onClick={() => handleOpenAuth()}
              >
                Login/Signup
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              {["Orders", "Cart", "Settings", "ChatBot", "Help", "Logout"].map(
                (item, index) => (
                  <div key={index}>
                    <button
                      className="w-full text-left px-3 py-2 rounded-md transition duration-200 ease-in-out
             hover:font-[500] 
             hover:scale-[1.01] active:scale-100"
                    >
                      {item}
                    </button>

                    {index !== 4 && (
                      <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-700" />
                    )}
                  </div>
                )
              )}
            </nav>
          </div>

          <div className="text-sm text-center text-gray-400 mt-8">
            &copy; 2025 HomeHero Inc.
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSideBar;
