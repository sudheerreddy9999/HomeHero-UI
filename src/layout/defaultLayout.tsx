import { ReactNode } from "react";

import NavBar from "@/components/navBar/navBar";
export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className=" w-full dark:bg-black">
        <NavBar/>
      <main>{children}</main>
    </div>
  );
}
