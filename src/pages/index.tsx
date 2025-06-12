import React from "react";
import BannerSection from "@/components/BannerSection";
// import IntroSection from "@/components/MainSection/introsection";
import Services from "@/components/services";

export default function Home() {
  return (
    <div className="">
      <div className="relative">
        <div>
          <BannerSection />
        </div>
        <div className=" flex justify-center items-center absolute -bottom-56 left-0 w-full h-full">
          <Services />
        </div>
      </div>
      {/* <IntroSection /> */}
    </div>
  );
}
