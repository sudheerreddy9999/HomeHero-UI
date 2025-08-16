import React from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import Image from "@/components/Image/image";
import { RiDeleteBinLine } from "react-icons/ri";
import { useTheme } from "@/context/ThemeContext";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { removeItemFromCart } from "@/store/actions/cart";

const CartItems = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const {isDarkMode} = useTheme();
  const dispatch = useAppDispatch();

    const handleRemoveItem = async (itemId: number) => {
      try {
        const payload = {
          service_id: itemId,
        };
  
        await dispatch(removeItemFromCart(payload));
      } catch (error) {
        console.log("Error from component:", error);
      }
    };

  return (
    <div className="max-w-6xl mx-auto p-0 md:p-6">
      {cartItems.length <= 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          {/* <img
            src="https://cdn-icons-png.flaticon.com/512/102/102661.png"
            alt="Empty Cart"
            className="w-32 h-32 mb-4 opacity-60"
          /> */}
          <h1 className="text-xl font-semibold text-gray-600">
            No Cart Items Found
          </h1>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center  ${isDarkMode?'bg-gray-800 text-gray-200':'bg-white text-gray-600'} rounded-2xl shadow-md p-4 hover:shadow-lg transition`}
            >
              <div className=" flex-shrink-0">
                <Image
                  src={item.service_type_image_url}
                  alt={item.service_name}
                  width={100}
                  height={100}
                  className="size-16 md:size-32 rounded-lg"
                />
              </div>

              <div className="flex-1  items-start text-left px-4 md:px-4 space-y-0.5">
                <h2 className=" text-xs md:text-lg font-semibold">
                  {item.service_type_name}
                </h2>
                <p className="text-sm hidden md:block ">
                  {item.service_type_description}
                </p>
                <p className="text-xs">
                  {item.service_name} 
                </p>
                  <p className="text-xs">
                  Astimated time • {item.duration_minutes} mins
                </p>
                {/* <div className="flex space-x-2">
                  <p className="text-xs">
                   saved  ₹{(Number(item.price)-Number(item.offerPrice)).toFixed(2)}
                  </p>
                  <p className="text-xs text-green-600 font-medium">10% OFF</p>
                </div> */}

                <button className="cursor-pointer hover:-translate-y-1" onClick={()=>handleRemoveItem(item.service_type_id)}>
                  <RiDeleteBinLine
                    size={20}
                    className="mt-3  hover:text-red-700 text-sm rounded-xl shadow"
                  />
                </button>
              </div>

              <div className="text-right">
                <div className="flex  items-center space-x-2 ">
                  <p className="font-bold ">₹{item.offerPrice}</p>
                </div>
              </div>
            </div>
          ))}

                  <div className="flex justify-end w-full mt-2 block sm:hidden">
          {" "}
          <button className="p-3 py-2 text-sm bg-[#53c9c2] rounded-lg cursor-pointer">
            Procced to Checkout
          </button>
        </div>
        </div>
      )}
    </div>
  );
};
export default CartItems;
