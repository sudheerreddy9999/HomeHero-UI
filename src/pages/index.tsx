import React from "react";
import BannerSection from "@/components/BannerSection";
// import IntroSection from "@/components/MainSection/introsection";
import MobileServices from "@/components/services/MobileServices";
import Services from "@/components/services";
import useIsMobile from "@/hooks/useIsMobile";
import MostBookedServices from "@/components/MostBookedServices";
import Footer from "@/components/footer";
import useDarkMode from '@/hooks/useDarkMode';

export default function Home() {
  const isMobile = useIsMobile();
    const isDarkMode = useDarkMode();
  return (
    <div className="dark:bg-gray-900  min-h-screen">
      <div className="relative">
        <div>
          <BannerSection />
        </div>
        {isMobile ? (
          <div className="mt-6">
            <MobileServices />
          </div>
        ) : (
          <div className=" flex justify-center items-center  absolute -bottom-56 left-0 w-full overflow-scroll h-full">
            <Services />
          </div>
        )}
      </div>
      <div>
      <p>{isDarkMode ? '🌙 Dark mode is on' : '☀️ Light mode is on'}</p>
    </div>
      {/* <IntroSection /> */}
      <div className="mt-6 xs:mt-24 md:mt-24 flex items-start">
        <MostBookedServices/>
      </div>
      <Footer />
    </div>
  );
}
