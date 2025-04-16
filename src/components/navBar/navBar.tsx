import React from "react";
import { useRouter } from "next/router";
import ModeToggleSwitch from "@/components/modeswitch";
import Logo from "../../assets/Home-HeroLogo.png";
import Image from "@/components/Image/image";

const NavBar = () => {
    const router = useRouter();
  return (
    <div className="shadow-2xs dark:border-[1px] dark:border-b-white w-full h-16  flex items-center justify-between px-10">
      <div>
        <Image src={Logo} alt="Main-Logo" className="h-10 w-44" />
      </div>
      <div className="flex gap-2 text-sm">
        <ModeToggleSwitch />
        <button className="w-24 h-9 flex justify-center items-center border-[1px] border-primary rounded-4xl px-3 cursor-pointer hover:-translate-y-0.5 dark:text-white" onClick={()=>router.push("/welcome")}>Login</button>
        <button className="w-24 h-9 flex justify-center items-center  bg-primary rounded-4xl px-3 cursor-pointer text-white hover:-translate-y-0.5 border-none">Signup</button>
      </div>
    </div>
  );
};

export default NavBar;
