"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import NavBar from "@/components/Nav/navBar/navBar";
import useIsMobile from "@/hooks/useIsMobile";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const isHome = pathname === "/";
  return (
    <div className="w-full dark:bg-black">
      {(isHome || !isMobile) && <NavBar />}


      <main>{children}</main>
    </div>
  );
}
