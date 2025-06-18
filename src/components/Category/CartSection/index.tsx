import React from "react";
import shopingCart from "@/assets/Categories/shopingCart.png";
import Image from "@/components/Image/image";
import { HelpCircle,  ShieldCheck } from "lucide-react";

const CartSection = () => {
  const offers = [
    "🔥 Get 10% off on orders above ₹1000",
    "💳 Use code SAVE50 to get ₹50 off",
    "🎁 Free home service on your 3rd booking",
  ];

  return (
    <div className="w-full sm:p-3 bgpt-0">
      <div className="flex flex-col  sm:p-5 md:p-0 pt-0 gap-4 max-w-6xl mx-auto">
        <div className="w-full flex flex-col items-center justify-center h-44 shadow-2xl rounded-2xl bg-white p-6 text-center">
          <Image src={shopingCart} alt="emptyShopingCart" className="size-16" />
          <p className="mt-2 text-gray-500 font-medium">No items in the cart</p>
        </div>
        <div className="w-full shadow-xl rounded-2xl bg-white p-4 space-y-3">
          <h2 className="text-lg font-bold">Available Offers</h2>
          <ul className="list-disc text-sm list-inside space-y-1 px-2  text-gray-700">
            {offers.map((offer, idx) => (
              <ul key={idx}>{offer}</ul>
            ))}
          </ul>
        </div>
        <div className="w-full shadow-xl rounded-2xl bg-white p-4 space-y-4">
          <h2 className="text-lg font-bold">Need Help?</h2>
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <HelpCircle className="text-blue-500 size-4 mt-1" />
            <p>
              Chat with support or call <strong>6303896539</strong>
            </p>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="text-purple-500 mt-1" />
            <p className="text-sm text-gray-600">
              All professionals are background verified and certified.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSection;
