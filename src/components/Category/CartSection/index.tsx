import React from "react";
import { useDispatch } from "react-redux";
import shopingCart from "@/assets/Categories/shopingCart.png";
import { useAppSelector } from "@/hooks/useAppSelector";
import Image from "@/components/Image/image";
import { HelpCircle, ShieldCheck } from "lucide-react";
import { FaMinus } from "react-icons/fa";
import type { AppDispatch } from "@/store/config/store";
import { removeItemFromCart } from "@/store/actions/cart";
import { useTheme } from "@/context/ThemeContext";

const CartSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isDarkMode } = useTheme();
  const {userDetails} = useAppSelector((state)=>state.user)
  const { cartItems, totalAmount, subtotal, taxAmount } = useAppSelector(
    (state) => state.cart
  );
  const offers = [
    "🔥 Get 10% off on orders above ₹1000",
    "💳 Use code SAVE50 to get ₹50 off",
    "🎁 Free home service on your 3rd booking",
  ];

  const handleRemoveItem = async (itemId: number) => {
    try {
      if (!userDetails) {
        throw new Error("User details not loaded");
      }
      const payload = {
        user_id: userDetails.user_id,
        service_id: itemId,
      };

      await dispatch(removeItemFromCart(payload));
    } catch (error) {
      console.log("Error from component:", error);
    }
  };

  return (
    <div
      className={`w-full ${
        isDarkMode ? "text-gray-200" : "text-gray-800"
      }  pt-0`}
    >
      <div className="flex flex-col  w-full sm:p-5 md:p-0 pt-0 gap-4 max-w-6xl mx-auto ">
        {cartItems.length > 0 ? (
          <div
            className={`w-full flex  flex-col shadow-2xl rounded-2xl ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }  p-3`}
          >
            <h1 className="py-2 font-bold text-lg">Products</h1>
            <div className="">
              <table className="w-full table-auto border-separate border-spacing-y-2">
                <thead
                  className={`${isDarkMode ? "bg-gray-600" : "bg-gray-100"}  `}
                >
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium">
                      Id
                    </th>
                    <th></th>
                    <th className="px-4 py-2 text-left text-sm font-medium">
                      Product
                    </th>
                    {/* <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Quantity
                    </th> */}
                    <th className="px-4 py-2 text-left text-sm font-medium">
                      Price
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index} className="   transition-colors">
                      <td className="px-4 py-2 text-sm ">{item.service_type_id}</td>
                      <td>
                        <Image
                          src={item.service_type_image_url}
                          alt="CartImages"
                          width={70}
                          height={20}
                          style={{ width: "40%", height: "30px" }}
                          className=" rounded-md"
                        />
                      </td>
                      <td className="px-4 text-sm py-2  ">
                        {item.service_name}
                      </td>
                      {/* <td className="px-4 py-2 text-sm text-gray-800">
                        {item.discountPercent}
                      </td> */}
                      <td className="px-4 py-2 text-sm ">${item.price}</td>
                      <td>
                        <button
                          className={` py-1.5 p-3.5 rounded-md ${
                            isDarkMode ? "bg-gray-600" : "bg-gray-200"
                          }  cursor-pointer`}
                          onClick={() =>
                            handleRemoveItem((item.service_type_id))
                          }
                        >
                          <FaMinus className="size-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="h-[1px] bg-gray-500 mt-3"></div>
            <div className="p-4 py-3 space-y-2">
              <div className="w-full flex  justify-between items-center">
                <h1>Sub Total : </h1> <h1>{subtotal}</h1>
              </div>
              <div className="w-full flex  justify-between items-center">
                <h1>Tax : </h1> <h1>{taxAmount}</h1>
              </div>
              <div className="w-full flex  justify-between items-center">
                <h1> Grand Total : </h1> <h1>{totalAmount}</h1>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`w-full flex flex-col items-center justify-center h-44 shadow-2xl rounded-2xl ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } p-6 text-center`}
          >
            <Image
              src={shopingCart}
              alt="emptyShopingCart"
              width={70}
              height={20}
            />
            <p className="mt-2  font-medium">No items in the cart</p>
          </div>
        )}
        <div
          className={`w-full shadow-xl rounded-2xl ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } p-4 space-y-3`}
        >
          <h2 className="text-lg font-bold">Available Offers</h2>
          <ul className="list-disc text-sm list-inside space-y-1 px-2 ">
            {offers.map((offer, idx) => (
              <ul key={idx}>{offer}</ul>
            ))}
          </ul>
        </div>
        <div
          className={`w-full shadow-xl hidden sm:block rounded-2xl ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } p-4 space-y-4`}
        >
          <h2 className="text-lg font-bold">Need Help?</h2>
          <div className="flex items-start gap-2 text-sm">
            <HelpCircle className="text-blue-500 size-4 mt-1" />
            <p>
              Chat with support or call <strong>6303896539</strong>
            </p>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="text-purple-500 mt-1" />
            <p className="text-sm ">
              All professionals are background verified and certified.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSection;
