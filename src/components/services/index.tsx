import React, { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getServicesAction } from "@/store/actions/services";
import Link from "next/link";
import Image from "../Image/image";
import { useTheme } from "@/context/ThemeContext";
import { ServicesHomePageSkelton } from "../skeletons";

interface serviceItem {
  id: number;
  description: string;
  image_url: string;
  route: string;
  name: string;
}
const Services = () => {
  const { isDarkMode } = useTheme();
  const dispatch = useAppDispatch();
  const { services, serviceLoading } = useAppSelector(
    (state) => state.services
  );

  useEffect(() => {
    dispatch(getServicesAction());
  }, [useDispatch,dispatch]);

  return (
    <div>
      <div className="flex ml-24 gap-6">
        {services.length > 0 && !serviceLoading ? (
          services.map((service: serviceItem) => (
            <Link
              href={service.route}
              key={service.id}
              className={`flex sm:p-1 py-2   sm:py-5 ${
                isDarkMode
                  ? "dark:hover:bg-gray-700/50 bg-gray-800"
                  : "bg-white hover:bg-white/70"
              }    hover:backdrop-invert hover:backdrop-opacity-10 dark:text-black  dark:bg-gray-800  flex-col justify-center items-center w-36 lg:w-52  rounded-3xl shadow-2xl  space-y-2 hover:-translate-y-3 hover:shadow-xl transition-all cursor-pointer`}
            >
              <div className="p-1 sm:p-2 bg-amber-50 rounded-full ">
                <Image
                  src={service.image_url}
                  alt={service.name}
                  width={28}
                  height={28}
                  className=" w-6 h-6 lg:w-7 lg:h-7 rounded-lg"
                />
              </div>
              <div className=" w-full rounded-br-lg rounded-bl-lg h-full  space-y-1 p-1 ">
                <p className=" sm:text-lg dark:text-sm   text-center lg:text-sm dark:text-gray-300 font-semibold dark:font-medium">
                  {service.name}
                </p>
                <p className="text-[12.5px] text-gray-400  text-center dark:text-gray-100">
                  {service.description}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <ServicesHomePageSkelton />
        )}
      </div>
    </div>
  );
};

export default Services;
