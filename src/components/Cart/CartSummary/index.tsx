import React from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useTheme } from "@/context/ThemeContext";

const CartSummary = () => {
  const { totalAmount, subtotal, taxAmount } = useAppSelector(
    (state) => state.cart
  );
  const {isDarkMode} = useTheme();
  return (
    <>
      {" "}
      <h1 className="font-bold text-2xl my-3">Order Summary</h1>
      <div className={` ${isDarkMode?'bg-gray-800 text-gray-200':'bg-white text-gray-900'} rounded-2xl shadow-md hover:shadow-lg p-4 transition`}>
        <div className="flex items-center">
          <div className="p-4 py-3 space-y-2 w-full">
            <div className="w-full flex  justify-between items-center">
              <h1 className=" font-semibold">Sub Total : </h1>{" "}
              <h1>{subtotal}</h1>
            </div>
            <div className="w-full flex  justify-between items-center">
              <h1 className="font-semibold">Tax : </h1> <h1>{taxAmount}</h1>
            </div>
            <div className="w-full flex  justify-between items-center">
              <h1 className="font-semibold"> Grand Total : </h1>{" "}
              <h1>{totalAmount}</h1>
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full mt-2">
          {" "}
          <button className="p-3 py-2 text-sm bg-[#53c9c2] rounded-lg cursor-pointer">
            Procced to Checkout
          </button>
        </div>
      </div>
    </>
  );
};
export default CartSummary;
