import React, { useState } from "react";
import { X } from "lucide-react";
import CartSection from "../CartSection";
import { useTheme } from "@/context/ThemeContext";
import { useAppSelector } from "@/hooks/useAppSelector";

const CartMobileView = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const { isDarkMode } = useTheme();
  const { totalAmount } = useAppSelector((state) => state.cart);

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0  ${
          isDarkMode ? "text-gray-100 bg-gray-800" : "text-gray-800 bg-white"
        } w-full shadow-md z-30 flex justify-between items-center px-4 py-3`}
      >
        <div className="font-semibold">Amount ₹ {totalAmount}</div>
        <button
          className="bg-blue-600 px-4 py-2 rounded-2xl text-white font-medium"
          onClick={() => setShowOverlay(true)}
        >
          View Cart
        </button>
      </div>

      {showOverlay && (
        <div
          className={`fixed inset-0  ${
            isDarkMode ? "text-gray-100" : "text-gray-800"
          } bg-black/50 z-40 flex items-end sm:items-center justify-center`}
        >
          <div
            className={`custom-scrollbar ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }  w-full sm:w-[400px] rounded-t-2xl sm:rounded-2xl px-2 p-6  shadow-lg relative max-h-[90vh] overflow-y-auto`}
          >
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setShowOverlay(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold ">Your Cart</h2>
            <CartSection />

            <div className="mt-6">
              <button className="w-full bg-blue-600 text-white py-2 rounded-xl font-medium">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartMobileView;
