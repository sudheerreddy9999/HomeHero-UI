import React from "react";
import Image from "next/image";
// import image from "@/assets/offers-image.jpg"
import { useTheme } from "@/context/ThemeContext";
import imageDarkMode from "@/assets/combo-services/offer-darkMode1.jpg"
import offers from "@/assets/combo-services/offers.jpeg"
import useIsMobile from "@/hooks/useIsMobile";

const OffersSection = () => {
  const { isDarkMode } = useTheme();
  const isMobile = useIsMobile();
  return (
    <div className=" md:mt-5 flex items-center justify-center spaxe-x-4 gap-10 mx-4 sm:mx-10 ">
      {/* <Image src={image} alt="offers-banner" className="w-full h-[450px] rounded-md"/> */}
      <Image
        src={isDarkMode ? imageDarkMode : offers}
        className={`w-full ${isMobile?'h-[200px] w-full':'h-[480px]'}  rounded-md`}
        alt="Offers Banner"
      />
      {/* <img
        src="https://ideogram.ai/assets/image/lossless/response/bLYga2tuRdq8_Qhzh3t_xQ"
        className="w-1/2 h-[400px] rounded-md"
      /> */}
    </div>
  );
};

export default OffersSection;
