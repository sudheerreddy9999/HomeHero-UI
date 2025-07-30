import React from "react";
import BannerSection from "@/components/BannerSection";
// import IntroSection from "@/components/MainSection/introsection";
import MobileServices from "@/components/services/MobileServices";
import Services from "@/components/services";
import useIsMobile from "@/hooks/useIsMobile";
import MostBookedServices from "@/components/MostBookedServices";
import ComboPackages from "@/components/MainSection/ComboSection";
import { useTheme } from "@/context/ThemeContext";
import OffersSection from "@/components/MainSection/OfferSection";

export default function Home() {
  const isMobile = useIsMobile();
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }  min-h-screen`}
    >
      <div className="relative">
        <div>
          <BannerSection />
        </div>
        {isMobile ? (
          <div className="mt-6">
            <MobileServices />
          </div>
        ) : (
          <div className="custom-scrollbar flex justify-center items-center  absolute -bottom-56 -left-12 w-full overflow-scroll h-full">
            <Services />
          </div>
        )}
      </div>
      <div></div>
      {/* <IntroSection /> */}
      <div className="mt-6 xs:mt-24 md:mt-24 flex items-start">
        <MostBookedServices />
      </div>
      <div>
        <OffersSection />
      </div>
      <div className="w-full">
        <ComboPackages />
      </div>
    </div>
  );
}
