import React, { useMemo } from "react";
import CarService from "@/assets/icons/Car-Repair.png";
import HomeService from "@/assets/icons/Home-Repair.png";
import PlumbingService from "@/assets/icons/plumbing-repair.png";
import AcService from "@/assets/icons/ac-reapir-icon.png";
import ElectricalServices from "@/assets/icons/electrical-repair.png";
import Link from "next/link";
import Image from "../Image/image";

const Services = () => {
  const serviceList = useMemo(
    () => [
      {
        title: "AC Repair Services",
        description: "Quick, reliable fixes to keep your home.",
        imageUrl: AcService,
        route: "/category/acservice",
      },
      {
        title: "Home Cleaning",
        description: "Professional cleaning for a spotless.",
        imageUrl: HomeService,
        route: "/category/homecleaning",
      },
      {
        title: "Plumbing Services",
        description: "Expert plumbing solutions for leaks, repairs.",
        imageUrl: PlumbingService,
        route: "/category/plumbing",
      },
      {
        title: "Electrical Services",
        description: "Safe, certified electrical repairs and installations.",
        imageUrl: ElectricalServices,
        route: "/category/electrical",
      },
      {
        title: "Cab Services",
        description: "Safe and affordable rides repairs and installations.",
        imageUrl: CarService,
        route: "/category/cabservices",
      },
    ],
    []
  );
  return (
    <div>
      <div className="flex ml-24 gap-6">
        {serviceList.map((service, index) => (
          <Link
            href={service.route}
            key={index}
            className="flex sm:p-1 py-2   sm:py-5 bg-white hover:bg-white/70 dark:hover:bg-gray-700/50 hover:backdrop-invert hover:backdrop-opacity-10 dark:text-black  dark:bg-gray-800  flex-col justify-center items-center w-36 lg:w-52  rounded-3xl shadow-2xl  space-y-2 hover:-translate-y-3 hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="p-1 sm:p-2 bg-amber-50 rounded-full ">
              <Image
                src={service.imageUrl}
                alt={service.title}
                className=" w-6 h-6 lg:w-7 lg:h-7 rounded-lg"
              />
            </div>
            <div className=" w-full rounded-br-lg rounded-bl-lg h-full  space-y-1 p-1 ">
              <p className=" sm:text-lg dark:text-sm   text-center lg:text-sm dark:text-gray-300 font-semibold dark:font-medium">
                {service.title}
              </p>
              <p className="text-[12.5px] text-gray-400  text-center dark:text-gray-100">
                {service.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Services;
