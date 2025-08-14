import React from "react";
import BannerSection from "@/components/HomePageSection/BannerSection";
// import IntroSection from "@/components/MainSection/introsection";
import MobileServices from "@/components/HomePageSection/Services/MobileServices";
import Services from "@/components/HomePageSection/Services";
import useIsMobile from "@/hooks/useIsMobile";
import MostBookedServices from "@/components/HomePageSection/MostBookedServices";
import ComboPackages from "@/components/HomePageSection/OffersSection/ComboSection";
import { useTheme } from "@/context/ThemeContext";
import OffersSection from "@/components/HomePageSection/OffersSection/OfferSection";

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
      <div className=" xs:mt-24 md:mt-24 flex items-start">
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
