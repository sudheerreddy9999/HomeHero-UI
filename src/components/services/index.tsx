import React, { useMemo } from "react";
import CarService from "@/assets/icons/Car-Repair.png";
import HomeService from "@/assets/icons/Home-Repair.png";
import PlumbingService from "@/assets/icons/plumbing-repair.png";
import AcService from "@/assets/icons/ac-reapir-icon.png";
import ElectricalServices from "@/assets/icons/electrical-repair.png";
import Image from "../Image/image";

const Services = () => {
  const serviceList = useMemo(
    () => [
      {
        title: "AC Repair Services",
        description: "Quick, reliable fixes to keep your home.",
        imageUrl: AcService,
      },
      {
        title: "Home Cleaning",
        description: "Professional cleaning for a spotless.",
        imageUrl: HomeService,
      },
      {
        title: "Plumbing Services",
        description: "Expert plumbing solutions for leaks, repairs.",
        imageUrl: PlumbingService,
      },
      {
        title: "Electrical Services",
        description: "Safe, certified electrical repairs and installations.",
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
    <div>
      <div className="flex gap-6">
        {serviceList.map((service, index) => (
          <div
            key={index}
            className="flex p-1  py-5 bg-white hover:bg-white/70 hover:backdrop-invert hover:backdrop-opacity-10  dark:bg-[#1e1e26]  dark:text-white flex-col justify-center items-center w-28 lg:w-52  rounded-3xl shadow-2xl  space-y-2 hover:-translate-y-3 hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="p-2 bg-amber-50 rounded-full ">
              <Image
                src={service.imageUrl}
                alt={service.title}
                className=" w-10 h-10 lg:w-7 lg:h-7 rounded-lg"
              />
            </div>
            <div className=" w-full rounded-br-lg rounded-bl-lg h-full  space-y-1 p-1 ">
              <p className=" text-lg dark:text-sm   text-center lg:text-sm dark:text-gray-300 font-semibold dark:font-medium">
                {service.title}
              </p>
              <p className="text-[12.5px] text-gray-400  text-center dark:text-gray-300 hidden sm:block ">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
