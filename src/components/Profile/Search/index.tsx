import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import useIsMobile from "@/hooks/useIsMobile";
import { IoArrowBack } from "react-icons/io5";
import { useAppSelector } from "@/hooks/useAppSelector";
import { FiArrowUpRight } from "react-icons/fi";
import { IoIosTrendingUp } from "react-icons/io";
import Image from "@/components/Image/image";
import { ServiceItem } from "@/types/serviceTypes";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { SearchItemSkelton } from "@/components/skeletons";
import {
  getTrendingServices,
  getSearchServiceItems,
} from "@/store/actions/services";

interface MobileHomeSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileHomeSearch: React.FC<MobileHomeSearchProps> = ({
  isOpen,
  onClose,
}) => {
  const { isDarkMode } = useTheme();
  const isMobile = useIsMobile();
  const [textInputFeild, setTextInputFeild] = useState("");
  const [debounceValue, setDebounceValue] = useState("");
  const dispatch = useAppDispatch();
  const { trending, serviceSerachItems } = useAppSelector(
    (state) => state.services
  );
  const [currentItems, setCurrentItems] = useState(trending);
  useEffect(() => {
    if (textInputFeild.length > 0 && serviceSerachItems.length > 0) {
      setCurrentItems(serviceSerachItems);
    } else {
      // setCurrentItems(trending);
    }
  }, [textInputFeild, trending, serviceSerachItems]);
  useEffect(() => {
    if (trending.length <= 0) dispatch(getTrendingServices());
    if (serviceSerachItems.length > 0) {
      setCurrentItems(serviceSerachItems);
    } else {
      setCurrentItems(trending);
    }
  }, [dispatch, trending, serviceSerachItems]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(textInputFeild);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [textInputFeild]);

  useEffect(() => {
    if (debounceValue) {
      const payload = {
        headers: {
          service_name: debounceValue,
        },
      };
      dispatch(getSearchServiceItems(payload));
    }
  }, [debounceValue, dispatch]);
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-700"
      } shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 px-2">
        <div className="relative w-full">
          <IoArrowBack
            size={24}
            onClick={onClose}
            className={`absolute left-4 ${
              isDarkMode ? "text-white" : "text-gray-700"
            }  top-1/2 transform -translate-y-1/2  z-20`}
          />
          <input
            type="text"
            placeholder={
              isMobile
                ? "How Can We Help You Today?"
                : 'Search for Services, "AC Repair", "Plumber", "Electrician" etc...'
            }
            className={`w-full  border-2 text-sm sm:text-[15px] pl-12 pr-4 py-3 mt-0 rounded-xl  ${
              isDarkMode
                ? "bg-gray-800 text-white"
                : " bg-white border border-gray-300 text-gray-700"
            } z-10 relative`}
            value={textInputFeild}
            onChange={(e) => setTextInputFeild(e.target.value)}
          />
          <div className=" p-1.5 sm:p-2 rounded-full absolute right-1 top-1/2 transform -translate-y-1/2 z-20">
            <FiArrowUpRight size={24} />
          </div>
        </div>

        {currentItems.length == 0 ? (
          <SearchItemSkelton />
        ) : (
          <>
            {textInputFeild.length <= 0 && (
              <p className="flex items-center p-2  pb-0 font-bold text-sm">
                Trending Services{" "}
                <IoIosTrendingUp size={20} className="mx-2 font-bold" />
              </p>
            )}
            <div
              className={`flex  flex-col  sm:gap-4 space-y-2  p-2 px-2 overflow-auto h-[90vh] `}
            >
              {currentItems.slice(0, 6).map((item: ServiceItem, index) => (
                <div
                  key={index}
                  className={` custom-scrollbar service-card relative ${
                    isDarkMode ? "bg-gray-700" : "bg-white"
                  } ${
                    isMobile ? "h-[65px]" : "h-[90px]"
                  }   flex  border-b-1  border-gray-600 overflow-hidden transition-transform duration-300 hover:scale-[1.02] p-2`}
                >
                  <div>
                    <Image
                      src={item.service_type_image_url}
                      alt={item.service_name}
                      width={200}
                      height={30}
                      className={`${
                        isMobile ? "w-16" : "w-32"
                      } h-full object-fit rounded-md`}
                    />
                  </div>

                  <div
                    className={`  flex  justify-between  px-auto  ${
                      isDarkMode ? " text-white" : "bg-white text-gray-800"
                    }    p-1 px-4`}
                  >
                    <div>
                      {" "}
                      <div className="flex justify-between items-center">
                        <p className=" dark:text-white mb-1 text-xs font-bold">
                          {item.service_type_name}
                        </p>
                      </div>
                      <p className="text-[10px] pb-3 text-start">
                        {item.service_type_description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileHomeSearch;
