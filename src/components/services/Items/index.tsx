import React from "react";
import Image from "@/components/Image/image";

interface ServiceItems {
  title: string;
  description: string;
  imageUrl: string;
}

interface props {
  data: ServiceItems[];
}
const Items = ({ data }: props) => {
    console.log(data)
  return (
    <div>
      <div className="flex gap-4">
        {data.map((service: ServiceItems, index: any) => (
          <div
            key={index}
            className="flex dark:bg-[#1e1e26] dark:text-white flex-col justify-center items-center w-28 lg:w-48 p-3 lg:p-5 rounded-lg shadow-2xl space-y-2 hover:-translate-y-3 hover:shadow-3xl transition-all cursor-pointer"
          >
            <Image
              src={service.imageUrl}
              alt={service.title}
              className=" w-10 h-10 lg:w-16 lg:h-16 rounded-lg"
            />
            <p className=" text-xs text-center lg:text-sm font-semibold">{service.title}</p>
            <p className="text-xs text-center hidden sm:block ">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
