import { ReactNode } from "react";


import NavBar from "@/components/Nav/navBar/navBar";
export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className=" w-full dark:bg-black">
        <div className="hidden sm:block "><NavBar/></div>
      <main>{children}</main>
    </div>
  );
}
