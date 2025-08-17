import React from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useAppSelector } from "@/hooks/useAppSelector";
import CartItems from "@/components/Cart/Items";
import MobileNonHome from "@/components/Nav/MobieNonHome";
import useIsMobile from "@/hooks/useIsMobile";
import CartSummary from "@/components/Cart/CartSummary";
const UserCart = () => {
  const { isDarkMode } = useTheme();
  const isMobile = useIsMobile();
  const { cartItems } = useAppSelector((state) => state.cart);
  return (
    <div
      className={`min-h-screen flex flex-col md:justify-center  md:items-center ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
      }  text-center px-4`}
    >
      {isMobile && <MobileNonHome message="Cart" route="/" />}
      {cartItems.length <= 0 ? (
        <div
          className={`min-h-screen flex flex-col justify-center items-center ${
            isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
          }  text-center px-4`}
        >
          <h1 className="text-3xl md:text-5xl font-bold ">No Items Found</h1>
          <p className="text-sm text-gray-600 mt-4 w-72 md:w-96 mb-6">
            Your cart is empty right now. Items you add will show up here.
          </p>
          <Link
            href="/"
            className="p-2 border-2 border-[#53c9c2] rounded-lg cursor-pointer hover:-translate-y-0.5 text-xs sm:text-[15px]"
          >
            Go to Homepage
          </Link>
        </div>
      ) : (
        <div className="w-full flex justify-start md:justify-between md:min-h-[50vh] items-start md:mt-16">
          <div className=" w-full md:w-8/12 mt-16 md:mt-0">
            <CartItems />
          </div>
          <div className="w-4/12 hidden md:block">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCart;
