import React from "react";
import { ACService } from "@/Jsons/acServives";
import Image from "@/components/Image/image";

type SelectedCategoryProps = {
  selectedItems: ACService[];
};

const SelectedCategory = ({ selectedItems }: SelectedCategoryProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  h-[78vh] sm:h-[72vh] overflow-scroll no-scrollbar">
      {selectedItems.map((item) => (
        <div
          key={item.id}
          className="relative bg-white dark:bg-zinc-900 rounded-2xl h-60 shadow-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
        >
          <Image
            src={item.image}
            alt={item.serviceName}
            className="w-full h-28 object-cover"
          />
          <div className="absolute top-20 w-[93%] px-auto ml-2.5 h-36 bg-white dark:bg-zinc-800/80 backdrop-blur-md rounded-2xl p-4 shadow-md">
            <h3 className=" font-semibold text-gray-800 dark:text-white mb-1">
              {item.serviceName}
            </h3>

            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              {item.description}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-semibold">
                ₹{item.afterPrice}
              </span>
              <span className="line-through text-gray-400 text-sm">
                ₹{item.beforePrice}
              </span>
              <span className="text-green-600 text-sm font-medium">
                ({item.discountPercent}% OFF)
              </span>
            </div>
            <div className="flex justify-between items-center ">
              <p className="text-xs text-gray-600 mt-1">
                You save ₹{item.saved}
              </p>
              <button className="mt-1 w-1/4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1 rounded-lg transition">
                Add +
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectedCategory;
