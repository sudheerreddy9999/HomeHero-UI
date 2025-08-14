import React, { useMemo } from "react";

import AcImage from "@/assets/services/AC-Service1.png";
import HomeService from "@/assets/services/Home-Service.png";
import PlumbingService from "@/assets/services/plumber.png";
import ElectricalService from "@/assets/services/electrical.png";
import CabService from "@/assets/services/cabServices.png";
import { useTheme } from "@/context/ThemeContext";
import Image from "@/components/Image/image";
import Link from "next/link";

const MobileServices = () => {
  const serviceList = useMemo(
    () => [
      {
        title: "AC Repair ",
        description: "Quick, reliable fixes to keep your home.",
        imageUrl: AcImage,
        route: "/category/acservices",
      },
      {
        title: "Home Services",
        description: "Professional cleaning for a spotless.",
        imageUrl: HomeService,
        route: "/category/homecleaning",
      },
      {
        title: "Plumbing ",
        description: "Expert plumbing solutions for leaks, repairs.",
        imageUrl: PlumbingService,
        route: "/category/plumbing",
      },
      {
        title: "Electrical ",
        description: "Safe, certified electrical repairs and installations.",
        imageUrl: ElectricalService,
        route: "/category/electrical",
      },
      {
        title: "saloon Services",
        description: "Safe and affordable rides repairs and installations.",
        imageUrl: CabService,
        route: "/category/saloon",
      },
    ],
    []
  );
  const { isDarkMode } = useTheme();
  return (
    <div>
      <p className=" font-[600] px-2 dark:text-white mb-3">
        Top-Rated Services
      </p>
      <div className="flex flex-col text-start items-center gap-6">
        <div className="flex justify-center items-center gap-6">
          {serviceList.slice(0, 3).map((service, index) => (
            <Link
              href={service.route}
              key={index}
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-gray-50"
              }   rounded-lg w-24 h-20 shadow-lg flex flex-col justify-center hover:-translate-y-1 items-center space-y-2`}
            >
              <Image
                src={service.imageUrl}
                className="size-[30px] w-[35px] "
                alt="serviceImage"
              />
              <p className="text-center text-xs font-medium">{service.title}</p>
            </Link>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          {serviceList.slice(3).map((service, index) => (
            <div
              key={index + 3}
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-gray-50"
              }  dark:bg-gray-100 rounded-lg w-24 h-20 shadow-lg hover:-translate-y-1 flex flex-col justify-center items-center space-y-2`}
            >
              <Link
                href={service.route}
                key={index}
                className={`${
                  isDarkMode ? "bg-gray-800" : "bg-gray-50"
                }   rounded-lg w-24 h-20  shadow-lg flex flex-col justify-center hover:-translate-y-1 items-center space-y-2`}
              >
                <Image
                  src={service.imageUrl}
                  className="size-[30px] w-[35px] "
                  alt="serviceImage"
                />
                <p className="text-center text-xs font-medium">
                  {service.title}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileServices;
