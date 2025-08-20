import React, { useEffect, useState } from "react";
import Image from "@/components/Image/image";
import { useTheme } from "@/context/ThemeContext";
import useIsMobile from "@/hooks/useIsMobile";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getTrendingServices } from "@/store/actions/services";
import { ServiceItem } from "@/types/serviceTypes";
import ServiceItemModel from "@/components/Category/ServiceItemModel";
import { ComboPackagesSkeleton } from "@/components/skeletons";

const ComboPackages = () => {
  const [serviceModelItem, setServiceItemModel] = useState<ServiceItem>();
  const [openServiceModel, setOpenServiceModel] = useState(false);
  const { isDarkMode } = useTheme();
  const dispatch = useAppDispatch();

  const { trending } = useAppSelector((state) => state.services);
  const isMobile = useIsMobile();
  const handleBookNow = (combo: ServiceItem) => {
    setServiceItemModel(combo);
    setOpenServiceModel(true);
  };
  useEffect(() => {
    if (trending.length <= 0) {
      dispatch(getTrendingServices());
    }
  }, [trending, dispatch]);
  return (
    <>
      {openServiceModel && serviceModelItem && (
        <ServiceItemModel
          serviceModelItem={serviceModelItem}
          isOpen={openServiceModel}
          onClose={() => setOpenServiceModel(false)}
        />
      )}
      <section
        className={`w-full ${isMobile ? "px-3 py-5 " : "px-6 py-10 "} ${
          isDarkMode ? " text-gray-200" : " text-gray-700"
        }`}
      >
        <div className=" w-full">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Combo Packages
          </h2>
          <div>
            {trending.length <= 0 ? (
              <ComboPackagesSkeleton />
            ) : (
              <div
                className={`${
                  isMobile
                    ? " flex w-full overflow-x-scroll custom-scrollbar"
                    : "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                }  gap-6`}
              >
                {" "}
                {trending.slice(6).map((combo: ServiceItem, index) => {
                  // const saved =
                  //   parseInt(combo.originalPrice.replace("₹", "")) -
                  //   parseInt(combo.price.replace("₹", ""));

                  return (
                    <div
                      key={index}
                      className={`  relative ${
                        isDarkMode
                          ? "bg-gray-800"
                          : "bg-white border border-gray-100"
                      }  rounded-2xl shadow-md  flex flex-col  h-full ${
                        isMobile
                          ? "p-2 pt-8 shrink-0  w-[210px] min-h-[220px]"
                          : "p-5 pt-10"
                      }`}
                    >
                      <Image
                        src={combo.service_type_image_url}
                        alt={combo.service_type_name}
                        width={200}
                        height={100}
                        className={`${
                          isMobile ? "h-24" : "w-10/12 h-40"
                        }  object-fit rounded-t-[30px] rounded-b-[70px] ${
                          isDarkMode
                            ? "border-2 border-gray-600"
                            : "border-2 border-gray-200"
                        }  mx-auto mt-[-16px]`}
                      />
                      <div
                        className={`absolute ${
                          isMobile
                            ? "w-7 h-[80px] -top-6 right-7 pt-1 -rotate-90 flex flex-col "
                            : "w-10 h-[75px] top-0 right-4 text-sm flex flex-col"
                        }  bg-green-600  font-semibold text-gray-100 text-center items-center   z-10`}
                      >
                        <span
                          className={` py-2 ${
                            isMobile && "rotate-90 text-xs"
                          }  `}
                        >
                          {combo.service_type_id}%
                        </span>
                        <span className={`${isMobile && "rotate-90 text-xs"}`}>
                          OFF
                        </span>
                        <div
                          className={`absolute  bottom-0 -left-0  h-full
                      ${
                        isMobile
                          ? "border-l-[16px] border-l-transparent border-r-[10px] border-r-transparent  border-b-[16px]"
                          : " border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent  border-b-[20px]  "
                      } ${
                            isDarkMode ? "border-b-gray-800" : "border-b-white"
                          }  bg-transparent`}
                        />
                      </div>

                      <div className="flex flex-col justify-between text-sm  flex-1 mt-4">
                        <div>
                          <h3
                            className={`${
                              isMobile ? "text-xs" : "text-base font-semibold"
                            } `}
                          >
                            {combo.service_type_name}
                          </h3>
                          {!isMobile && (
                            <p
                              className={`text-[12.5px] mt-1 ${
                                isDarkMode ? "text-gray-400" : "text-gray-700"
                              } `}
                            >
                              {combo.service_type_description}
                            </p>
                          )}
                          {isMobile && (
                            <div className="mt-2 flex flex-col gap-1 text-xs">
                              {/* <span className="text-green-600 font-lg">
                        Save ₹{saved}
                      </span>
                      <span className="text-red-500 font-medium">
                        Valid till {combo.validTill}
                      </span> */}
                              <span className="text-gray-400 italic">
                                Note: {combo.service_name}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Push this section to bottom */}
                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-sm sm:font-bold sm:text-base">
                            {combo.offerPrice}
                            <span className="text-gray-400 line-through text-xs sm:text-sm ml-1 sm:ml-2">
                              {combo.price}
                            </span>
                          </div>
                          <button
                            onClick={() => handleBookNow(combo)}
                            className={`bg-[#53c9c2] text-white ${
                              isMobile ? "py-2 px-2 text-xs" : "py-2 px-4"
                            }  rounded-lg cursor-pointer hover:-translate-y-1 transition-colors`}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ComboPackages;
