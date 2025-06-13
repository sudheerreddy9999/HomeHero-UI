import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import ModeToggleSwitch from "@/components/Nav/modeswitch";
import Logo from "@/assets/Home-HeroLogo.png";
import Image from "@/components/Image/image";
import MobileLogo from "@/assets/home-hero-icon.png"
import Location from "../location";
import Welcome from "../../Auth";
import DarkThemeLogo from "@/assets/DarkThemeLogo.png";
import mobileDarkThemeLogo from "@/assets/icons/mobile-drak-ThemeLogo.png";

const NavBar = () => {
  // const router = useRouter();
  const [openAuth, setOpenAuth] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const handlecloseAuth = () => {
    setOpenAuth(!openAuth);
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return (
    <>
      {openAuth && <Welcome onAuthClose={handlecloseAuth} />}
      <div className="  dark:text-white   w-full h-16  flex items-center justify-between px-4 sm:px-10 fixed top-0 left-0 z-50">
        <div>
          <Image
            src={isMobile? MobileLogo: Logo}
            alt="Main-Logo"
            className={` ${isMobile?"size-7":"h-10 w-44"} block dark:hidden cursor-pointer`}
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
        <div className="flex gap-4   text-sm justify-center items-center">
          <Location />
          <ModeToggleSwitch />
          <button
            className={` ${
              isMobile ? " w-14 h-7" : " w-24 h-9 text-xs"
            } bg-white flex justify-center items-center border-[1px] border-[#53c9c2] rounded-4xl px-3 cursor-pointer hover:-translate-y-0.5 dark:text-black  dark:font-[500]  dark:bg-white`}
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
