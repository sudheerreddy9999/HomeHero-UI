import React from "react";
import { ServiceItem } from "@/types/serviceTypes";
import Image from "@/components/Image/image";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/config/store";
import { addToCartAction, removeItemFromCart } from "@/store/actions/cart";
import { useTheme } from "@/context/ThemeContext";
import useIsMobile from "@/hooks/useIsMobile";
import { useAppSelector } from "@/hooks/useAppSelector";

type SelectedCategoryProps = {
  selectedItems: ServiceItem[];
  height?: number;
};

const SelectedCategory = ({ selectedItems, height }: SelectedCategoryProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isDarkMode } = useTheme();
  const isMobile = useIsMobile();

  const { cartItems } = useAppSelector((state) => state.cart);

  const handleAddToCart = async (item: ServiceItem) => {
    try {
      await dispatch(addToCartAction(item));
    } catch (error) {
      console.log("Error from component:", error);
    }
  };

  const handleRemoveFromCart = async (itemId: number) => {
    try {
      await dispatch(removeItemFromCart(itemId));
    } catch (error) {
      console.log("Error from component:", error);
    }
  };

  const isInCart = (itemId: number) => {
    return cartItems.some((cartItem) => cartItem.service_type_id === itemId);
  };

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 overflow-scroll no-scrollbar `}
      style={{ height: !isMobile ? `${height}px` : undefined }}
    >
      {selectedItems.map((item, index) => {
        const added = isInCart(item.service_type_id);

        return (
          <div
            key={index}
            className={`custom-scrollbar service-card relative ${
              isDarkMode ? "bg-gray-700" : "bg-white"
            } rounded-2xl h-52 shadow-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]`}
          >
            <Image
              src={item.service_type_image_url}
              alt={item.service_name}
              width={400}
              height={100}
              style={{ width: "100%", height: "124px" }}
              className="object-cover"
              unoptimized
            />
            <div
              className={`absolute top-[70px] left-2 h-32 flex flex-col justify-between w-[95%] px-auto ${
                isDarkMode
                  ? "bg-zinc-800/80 text-white"
                  : "bg-white text-gray-800"
              } backdrop-blur-md rounded-2xl p-4 pb-2 shadow-md`}
            >
              <div className="flex justify-between items-center">
                <h3 className="title font-semibold dark:text-white mb-1">
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

                {added ? (
                  <button
                    className=" w-2/12 flex justify-center items-center p-2.5 pl-1  border border-blue-500  text-gray-700 text-sm font-medium py-1.5 rounded-lg transition cursor-pointer"
                    onClick={() => handleRemoveFromCart(item.service_type_id)}
                  >
                     <FaMinus className="ml-1.5" />
                  </button>
                ) : (
                  <button
                    className="w-1/4 flex justify-center items-center p-2.5 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-1.5 rounded-lg transition cursor-pointer"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add <FaPlus className="ml-1.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectedCategory;
