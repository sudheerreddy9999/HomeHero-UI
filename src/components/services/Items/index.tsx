import React from "react";
import Image from "@/components/Image/image";
import { StaticImageData } from 'next/image';


interface ServiceItems {
  title: string;
  description: string;
  imageUrl: string| StaticImageData;
}

interface props {
  data: ServiceItems[];
}
const Items = ({ data }: props) => {
  return (
    <div>
      <div className="flex gap-6">
        {data.map((service: ServiceItems, index) => (
          <div
            key={index}
            className="flex dark:bg-[#1e1e26] hover:border-[1px] hover:border-[#174479] dark:text-white flex-col justify-center items-center w-28 lg:w-52  rounded-lg shadow-2xl space-y-2 hover:-translate-y-3 hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="p-4 pt-6">
              <Image
                src={service.imageUrl}
                alt={service.title}
                className=" w-10 h-10 lg:w-16 lg:h-16 rounded-lg"
              />
            </div>
            <div className="bg-[#05b0a6] w-full rounded-br-lg rounded-bl-lg h-full  space-y-1 p-1 ">
              <p className=" text-lg dark:text-sm  text-white text-center lg:text-sm dark:text-gray-300 font-semibold dark:font-medium">
                {service.title}
              </p>
              <p className="text-[12.5px] text-white text-center dark:text-gray-300 hidden sm:block ">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
