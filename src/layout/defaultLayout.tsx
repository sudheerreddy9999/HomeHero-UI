import { ReactNode } from "react";

import NavBar from "@/components/navBar/navBar";
export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-full dark:bg-black">
        <NavBar/>
      <h1 className="text-4xl font-bold text-primary">Home Hero </h1>
      <main>{children}</main>
    </div>
  );
}
