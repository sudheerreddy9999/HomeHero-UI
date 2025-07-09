import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import ModeToggleSwitch from "@/components/Nav/modeswitch";
import Logo from "@/assets/Home-HeroLogo.png";
import Image from "@/components/Image/image";
import MobileLogo from "@/assets/home-hero-icon.png";
import Location from "../location";
import Welcome from "../../Auth";
import DarkThemeLogo from "@/assets/DarkThemeLogo.png";
// import useDarkMode from "@/hooks/useDarkMode";
import mobileDarkThemeLogo from "@/assets/icons/mobile-drak-ThemeLogo.png";
import Search from "@/components/Search";
import useIsMobile from "@/hooks/useIsMobile";
import { useTheme } from "@/context/ThemeContext";

import { usePathname } from "next/navigation";

const NavBar = () => {
  // const router = useRouter();
  const [openAuth, setOpenAuth] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [comparePercent, setComparePercent] = useState(59);
  // const isDarkMode = useDarkMode();
  // const [isMobile, setIsMobile] = useState(false);
  const { isDarkMode } = useTheme();
  const pathName = usePathname();
  const isHome = pathName === "/";
  const isMobile = useIsMobile();
  const handlecloseAuth = () => {
    setOpenAuth(!openAuth);
  };

  // useEffect(() => {
  //   const checkMobile = () => setIsMobile(window.innerWidth <= 768);
  //   checkMobile();
  //   window.addEventListener("resize", checkMobile);
  //   return () => window.removeEventListener("resize", checkMobile);
  // }, []);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / windowHeight) * 100;
      setScrollPercent(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (isMobile) {
      if (scrollPercent > 59) {
        setComparePercent(59);
      } else {
        setComparePercent(20);
      }
    }
  }, [scrollPercent,isMobile]);
  return (
    <>
      {openAuth && <Welcome onAuthClose={handlecloseAuth} />}
      <div
        className={`${
          scrollPercent > comparePercent
            ? isDarkMode
              ? "bg-gray-800"
              : "bg-white"
            : ""
        } w-full h-16  flex items-center justify-between px-4 sm:px-10 fixed top-0 left-0 z-50`}
      >
        <div>
          <Image
            src={isMobile ? MobileLogo : Logo}
            alt="Main-Logo"
            className={` ${
              isMobile ? "size-7" : "h-8 w-36"
            } block dark:hidden cursor-pointer`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
          <Image
            src={isMobile ? mobileDarkThemeLogo : DarkThemeLogo}
            alt="Main-Logo-Dark"
            className={` ${
              isMobile ? "size-7" : " h-32 w-44"
            } hidden dark:block cursor-pointer`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
        </div>
        {!isMobile && (
          <div className="w-[35%] flex items-center justify-center ml-32">
            {(scrollPercent > 59 || !isHome) && (
              <Search
                seachPlaceholder="Search for services, products, etc."
                place="navbar"
              />
            )}
          </div>
        )}
        <div className="flex gap-4   text-sm justify-center items-center">
          <Location />
          <ModeToggleSwitch />
          <button
            className={` ${
              isMobile ? " w-16 h-8" : " w-24 h-9 text-xs"
            } border-[1px] ${
              isDarkMode
                ? "bg-gray-800 text-white"
                : "bg-white border-[#53c9c2]"
            }  flex justify-center items-center  rounded-4xl px-3 cursor-pointer hover:-translate-y-0.5 dark:text-black  dark:font-[500]  dark:bg-white`}
            onClick={() => setOpenAuth(!openAuth)}
          >
            Login
          </button>
          {/* <button className="w-24 h-9 flex justify-center items-center  bg-primary rounded-4xl px-3 cursor-pointer text-white hover:-translate-y-0.5 border-none">Signup</button> */}
        </div>
      </div>
    </>
  );
};

export default NavBar;
