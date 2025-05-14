import React, { useEffect, useState, useMemo } from "react";
import CarService from "@/assets/icons/Car-Service.png";
import HomeService from "@/assets/icons/Home-Service.png";
import PlumbingService from "@/assets/icons/Pipe-Repair.png";
import AcService from "@/assets/icons/Ac-Service.png";
import ElectricalServices from "@/assets/icons/maintenance.svg";
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
          // End of loop: reset to first and stop
          setHeadingIndex(0);
          setTypedText(headings[0].dynamic);
          setLoopCompleted(true); // prevents future useEffect runs
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
        title: "Cab Services",
        description: "Safe and affordable rides.",
        imageUrl: CarService,
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
    ],
    []
  );
  return (
    <div className="flex flex-col space-y-6 justify-center items-center py-6 ">
      <div className=" text-sm lg:text-2xl dark:text-white md:text-2xl font-semibold text-center mt-10 text-gray-700">
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
