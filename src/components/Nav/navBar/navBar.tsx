import React, { useState } from "react";
// import { useRouter } from "next/router";
import ModeToggleSwitch from "@/components/Nav";
import Logo from "@/assets/Home-HeroLogo.png";
import Image from "@/components/Image/image";
import Location from "../location";
import Welcome from "../../Auth";

const NavBar = () => {
  // const router = useRouter();
  const [openAuth, setOpenAuth] = useState(false);
  const handlecloseAuth = ()=>{
    setOpenAuth(!openAuth)
  }
  return (
    <>
      {openAuth && <Welcome onAuthClose ={handlecloseAuth} />}
      <div className="shadow-2xs dark:border-[1px] bg-white dark:border-b-white w-full h-16  flex items-center justify-between px-10 fixed top-0 left-0 z-50">
        <div>
          <Image src={Logo} alt="Main-Logo" className="h-10 w-44" />
        </div>
        <div className="flex gap-2 text-sm justify-center items-center">
          <Location/>
          <ModeToggleSwitch />
          <button
            className="w-24 h-9 flex justify-center items-center border-[1px] border-[#53c9c2] rounded-4xl px-3 cursor-pointer hover:-translate-y-0.5 dark:text-white"
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
