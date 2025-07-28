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
import { LuNotebookText } from "react-icons/lu";
import ProfileDarkTheme from "@/assets/profile-darkMode.png";
import { BsCart4 } from "react-icons/bs";
import ChatBot from "@/components/ChatBot";
import Link from "next/link";
import MobileNav from "@/components/Nav/MobileNav";
// import MobileNonHome from "@/components/Nav/MobieNonHome";
import { useTheme } from "@/context/ThemeContext";

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
  const { isDarkMode } = useTheme();

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
      {/* {isMobileView && !isHome && <MobileNonHome />} */}
      {isHome && (
        <div
          className={` text-white ${
            scrollPercent > 25 &&
            `${
              isDarkMode
                ? "bg-gray-800 text-gray-100"
                : "bg-gray-50 text-gray-700"
            } shadow-2xl`
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
              <div className="w-[35%] ml-24 flex items-center justify-center">
                {(scrollPercent > 25 || !isHome) && (
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
            <div className="flex items-center space-x-4 gap-3">
              <div className="mt-2">
                <ModeToggleSwitch />
              </div>
              {!isMobileView && (
                <>
                  <div className="relative group inline-block">
                    <Link href="/bookings">
                      <LuNotebookText
                        size={22}
                        className={`${
                          isMobileView ? "text-gray-900" : "text-gray-800"
                        } cursor-pointer`}
                      />
                    </Link>

                    <div className="absolute left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block bg-gray-200 text-black text-xs px-2 py-1.5 rounded shadow-md ">
                      Bookings
                    </div>
                  </div>
                  <div className="relative group inline-block">
                    <Link href="/cart">
                      <BsCart4
                        size={22}
                        className={`${
                          isMobileView ? "text-gray-900" : "text-gray-800"
                        } cursor-pointer`}
                      />
                    </Link>
                    <div className="absolute left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block bg-gray-200 text-black text-xs px-2 py-1.5 rounded shadow-md ">
                      Cart
                    </div>
                  </div>
                </>
              )}

              <div
                className="text-gray-900  relative inline-block"
                ref={dropdownRef}
              >
                {isDarkMode ? (
                  <Image
                    src={ProfileDarkTheme}
                    alt="Profile Dark Mode"
                    onClick={() => setOpen(!open)}
                    className={`size-6 ${
                      isMobileView ? "text-gray-900" : "text-gray-800"
                    } dark:text-blue-500 cursor-pointer `}
                  />
                ) : (
                  <FaRegCircleUser
                    className={`size-6 ${
                      isMobileView ? "text-gray-900" : "text-gray-800"
                    } dark:text-blue-500 cursor-pointer`}
                    onClick={() => setOpen(!open)}
                  />
                )}

                {open && (
                  <div
                    className={`absolute w-36 -right-20 sm:-right-24   mt-2 -translate-x-1/2 ${
                      isDarkMode
                        ? "bg-gray-900 text-gray-100"
                        : "bg-white text-gray-700"
                    } bg-gray-100 p-3 rounded-[10px] `}
                  >
                    <p className="border-b-1 py-2">
                      {" "}
                      {userDetails?.first_name || userDetails?.email}{" "}
                      {userDetails?.last_name}
                    </p>
                    <p className="border-b-1 py-2 cursor-pointer">Profile</p>
                    <p
                      className="py-2 cursor-pointer"
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
      )}

      <main>
        {children}
        {isMobileView ? isHome && <MobileNav /> : <ChatBot />}
      </main>
    </>
  );
}
