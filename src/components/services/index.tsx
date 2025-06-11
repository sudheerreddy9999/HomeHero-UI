import React, { useEffect, useState, useMemo } from "react";
import CarService from "@/assets/icons/Car-Repair.png";
import HomeService from "@/assets/icons/Home-Repair.png";
import PlumbingService from "@/assets/icons/plumbing-repair.png";
import AcService from "@/assets/icons/ac-reapir-icon.png";
import ElectricalServices from "@/assets/icons/electrical-repair.png";
import Items from "./Items";

const Services = () => {
  const headings = useMemo(
    () => [
      {
        static: "Everything You Need,",
        dynamic: "All in One Place.",
      },
      {
        static: "Trusted Services,",
        dynamic: "Right at Your Doorstep.",
      },
      {
        static: "Reliable Help",
        dynamic: "for Every Need.",
      },
    ],
    []
  );
  const [headingIndex, setHeadingIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [loopCompleted, setLoopCompleted] = useState(false);

  useEffect(() => {
    if (loopCompleted) return;

    const currentDynamic = headings[headingIndex].dynamic;

    if (charIndex < currentDynamic.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + currentDynamic[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        if (headingIndex === headings.length - 1) {
          setHeadingIndex(0);
          setTypedText(headings[0].dynamic);
          setLoopCompleted(true);
        } else {
          setHeadingIndex((prev) => prev + 1);
          setCharIndex(0);
          setTypedText("");
        }
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, headingIndex, loopCompleted, headings]);

  const serviceList = useMemo(
    () => [
      {
        title: "AC Repair Services",
        description:
          "Quick, reliable fixes to keep your home.",
        imageUrl: AcService,
      },
      {
        title: "Home Cleaning",
        description: "Professional cleaning for a spotless.",
        imageUrl: HomeService,
      },
      {
        title: "Plumbing Services",
        description:
          "Expert plumbing solutions for leaks, repairs.",
        imageUrl: PlumbingService,
      },
      {
        title: "Electrical Services",
        description:
          "Safe, certified electrical repairs and installations.",
        imageUrl: ElectricalServices,
      },
            {
        title: "Cab Services",
        description: "Safe and affordable rides repairs and installations.",
        imageUrl: CarService,
      },
    ],
    []
  );
  return (
    <div className="flex flex-col space-y-6 justify-center items-center  ">
      <div className=" text-[16px] text-[#174479] lg:text-2xl dark:text-gray-100 md:text-2xl font-semibold text-center mt-4 sm:mt-10 ">
        {headings[headingIndex].static}{" "} 
        <span>
          {typedText}
          {!loopCompleted && (
            <span className=" border-gray-800 animate-pulse ml-1"></span>
          )}
        </span>
      </div>
      <Items data={serviceList.slice(0, 3)} />
      <Items data={serviceList.slice(3, 5)} />
    </div>
  );
};

export default Services;
