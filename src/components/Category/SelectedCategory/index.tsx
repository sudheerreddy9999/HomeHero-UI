import React from "react";
import { ServiceItem } from "@/types/serviceTypes";
import Image from "@/components/Image/image";
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/config/store";
import { addToCartAction } from "@/store/actions/cart";
import { useTheme } from "@/context/ThemeContext";
import useIsMobile from "@/hooks/useIsMobile";

type SelectedCategoryProps = {
  selectedItems: ServiceItem[];
  height?: number;
};

const SelectedCategory = ({ selectedItems, height }: SelectedCategoryProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isDarkMode } = useTheme();
  const isMobile = useIsMobile();
  const handleAddToCart = async (item: ServiceItem) => {
    try {
      await dispatch(addToCartAction(item));
    } catch (error) {
      console.log("Error from component:", error);
    }
  };
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12      overflow-scroll no-scrollbar`}
      style={{ height: !isMobile ? `${height}px` : undefined }}
    >
      {selectedItems.map((item,index) => (
        <div
          key={index}
          className={` custom-scrollbar service-card relative ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          }  rounded-2xl h-60 shadow-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]`}
        >
          <Image
            src={item.service_type_image_url}
            alt={item.service_name}
             width={400}  
             height={144}      
            className="w-full h-36 object-cover"
          />
          <div
            className={`absolute top-26 left-2 h-32 flex flex-col justify-between   w-[95%] px-auto  ${
              isDarkMode
                ? "bg-zinc-800/80 text-white"
                : "bg-white text-gray-800"
            }    backdrop-blur-md rounded-2xl p-4 pb-2 shadow-md`}
          >
            <div className="flex justify-between items-center">
              <h3 className="title font-semibold  dark:text-white mb-1">
                {item.service_type_name}
              </h3>
              <span className="text-green-600 text-xs font-medium">
                ({item.duration_minutes}% OFF)
              </span>
            </div>

            <p className="text-xs mb-1">{item.service_type_description}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="description font-semibold">
                  ₹{item.offerPrice}
                </span>
                <span className="line-through text-gray-400 text-sm">
                  ₹{item.price}
                </span>
              </div>
              <button
                className=" w-1/4 flex justify-center items-center p-2.5  bg-blue-500 hover:bg-blue-700  text-white text-sm font-medium py-1.5 rounded-lg transition cursor-pointer"
                onClick={() => handleAddToCart(item)}
              >
                Add <FaPlus className="ml-1.5" />
                {/* <FaMinus className="ml-1.5" /> */}
              </button>
            </div>
            {/* <div className="flex justify-between items-center ">
              <p className="text-xs text-gray-600 mt-1">
                You save ₹{item.saved}
              </p>
              <button
                className="mt-1 w-1/4 flex justify-center items-center p-2  bg-blue-500 hover:bg-blue-700  text-white text-sm font-medium py-1.5 rounded-lg transition cursor-pointer"
                onClick={() => handleAddToCart(item)}
              >
                Add <FaPlus className="ml-1.5" />
              </button>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectedCategory;
