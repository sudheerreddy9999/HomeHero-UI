import { ReactNode } from "react";
import React, { useState, useEffect, useRef } from "react";
import Image from "@/components/Image/image";
import Logo from "../assets/Home-HeroLogo.png";
import LogoIcon from "../assets/home-hero-icon.png";
import ModeToggleSwitch from "@/components/Nav/modeswitch";
import { FaRegCircleUser } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import Search from "@/components/Search";
import { usePathname } from "next/navigation";
import type { AppDispatch } from "@/store/config/store";
import { handleUserLogout } from "@/store/actions/user";
import { useAppSelector } from "@/hooks/useAppSelector";
import Location from "@/components/Nav/location";
import isMobile from "@/hooks/useIsMobile";
import ChatBot from "@/components/ChatBot";
import MobileNav from "@/components/Nav/MobileNav";

export default function AuthorizedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const userDetails = useAppSelector((state) => state.user.userDetails);
  const dispatch = useDispatch<AppDispatch>();
  const isMobileView = isMobile();

  const pathName = usePathname();
  const isHome = pathName === "/";

  const handleHomeClick = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.href = "/";
    }
  };
  const handleLogoutClick = () => {
    dispatch(handleUserLogout());
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  return (
    <>
      <div
        className={` text-white ${
          scrollPercent > 59 && "bg-gray-50 shadow-2xl"
        }  w-full h-16   flex items-center justify-between ${
          isMobileView ? "" : "px-4"
        }  sm:px-10 fixed top-0 left-0 z-50 `}
      >
        {!isMobileView && (
          <>
            <div>
              <Image
                src={Logo}
                alt="Main-Logo"
                className="h-8 w-36 hidden sm:block cursor-pointer "
                onClick={() => handleHomeClick()}
              />
              <Image
                src={LogoIcon}
                alt="Mobile Logo"
                className=" block sm:hidden size-7"
              />
            </div>
            <div className="w-[35%] flex items-center justify-center">
              {(scrollPercent > 59 || !isHome) && (
                <Search
                  seachPlaceholder="Search for services, products, etc."
                  place="navbar"
                />
              )}
            </div>
          </>
        )}
        <div
          className={`flex items-center ${
            isMobileView ? "w-full pr-3 " : ""
          }  justify-between space-x-4 sm:gap-4 gap-4 text-sm`}
        >
          <div className="">
            <Location />
          </div>
          <div className="flex items-center space-x-2 gap-3">
            <div className="mt-2">
              <ModeToggleSwitch />
            </div>
            <div
              className="text-gray-700  relative inline-block"
              ref={dropdownRef}
            >
              <FaRegCircleUser
                className="size-6 dark:text-blue-400 cursor-pointer"
                onClick={() => setOpen(!open)}
              />
              {open && (
                <div className="absolute w-28  left-1/12 border-b-1  mt-2 -translate-x-1/2 bg-gray-100 p-2 rounded-[10px] ">
                  <p className="border-b-1 py-2">
                    {" "}
                    {userDetails?.first_name || userDetails?.email}{" "}
                    {userDetails?.last_name}
                  </p>
                  <p
                    className="py-1 cursor-pointer"
                    onClick={() => handleLogoutClick()}
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <main>
        {children}
        <div className="fixed bottom-4 right-4 p-4 z-50">
          <ChatBot />
        </div>
        {isMobileView && <MobileNav />}
      </main>
    </>
  );
}
