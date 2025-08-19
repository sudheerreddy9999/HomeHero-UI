import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import useIsMobile from "@/hooks/useIsMobile";
import Image from "@/components/Image/image";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useTheme } from "@/context/ThemeContext";
import { ServiceItem } from "@/types/serviceTypes";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { FiArrowUpRight } from "react-icons/fi";
import { IoIosTrendingUp } from "react-icons/io";
import noResults from "@/assets/no-results-found.png";
import { SearchItemSkelton } from "@/components/skeletons";
import {
  getTrendingServices,
  getSearchServiceItems,
} from "@/store/actions/services";
const SearchModel = () => {
  const [textInputFeild, setTextInputFeild] = useState("");
  const [debounceValue, setDebounceValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const { trending, serviceSerachItems } = useAppSelector(
    (state) => state.services
  );
  const [currentBar, setCurrentBar] = useState(0);
  const currentItems =
    textInputFeild.length > 0 && serviceSerachItems.length > 0
      ? serviceSerachItems.slice(currentBar * 6, currentBar * 6 + 6)
      : trending.slice(currentBar * 6, currentBar * 6 + 6);

  const totalPages = Math.ceil(
    (textInputFeild.length > 0 && serviceSerachItems.length > 0
      ? serviceSerachItems.length
      : trending.length) / 6
  );
  const handleTabChange = (index: number) => {
    setCurrentBar(index);
  };
  useEffect(() => {
    if (trending.length <= 0) dispatch(getTrendingServices());
  }, [dispatch, trending]);
  useEffect(() => {
    setCurrentBar(0);
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
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (textInputFeild.length > 0 && serviceSerachItems.length <= 0) {
      setNoResultsFound(true);
    }
    if (textInputFeild.length == 0 || serviceSerachItems.length > 0) {
      setNoResultsFound(false);
    }
  }, [serviceSerachItems, textInputFeild]);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    let isThrottled = false;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        if (isThrottled) return;
        isThrottled = true;
        if (e.deltaX > 30) {
          setCurrentBar((prev) => Math.min(prev + 1, totalPages - 1));
        } else if (e.deltaX < -30) {
          setCurrentBar((prev) => Math.max(prev - 1, 0));
        }
        setTimeout(() => {
          isThrottled = false;
        }, 40);
      }
    };
    div.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      div.removeEventListener("wheel", handleWheel);
    };
  }, [totalPages]);

  return (
    <>
      <div
        className={` flex justify-center items-center ${
          isDarkMode
            ? "bg-gray-800"
            : "bg-gradient-to-br from-[#d2ecea] via-blue-50 to-[#badfdc]"
        }  py-10 mx-2 rounded-3xl`}
      >
        <div className="relative w-3/4 sm:w-10/12 mt-4 flex justify-center items-center">
          <CiSearch
            size={24}
            className={`absolute left-4 ${
              isDarkMode ? "text-white " : "text-gray-700"
            }  top-1/2 transform -translate-y-1/2  z-20`}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder={
              isMobile
                ? "How Can We Help You Today?"
                : 'Search for Services, "AC Repair", "Plumber", "Electrician" etc...'
            }
            className={`w-full text-sm sm:text-[15px] pl-12 pr-4 py-4 mt-0 rounded-full border focus:outline-none ${
              isDarkMode
                ? "bg-gray-800 text-white "
                : " bg-white  border-gray-300 text-gray-700"
            } z-10 relative`}
            value={textInputFeild}
            onChange={(e) => setTextInputFeild(e.target.value)}
          />
          <div className="bg-blue-400 p-1.5 sm:p-2 rounded-full absolute right-1 top-1/2 transform -translate-y-1/2 z-20">
            <FiArrowUpRight size={24} className="text-white" />
          </div>
        </div>
      </div>
      {textInputFeild.length <= 0 ? (
        <p className="flex items-center p-4 pb-0 font-bold text-lg mt-3">
          Trending Services{" "}
          <IoIosTrendingUp size={24} className="mx-2 font-bold" />
        </p>
      ) : (
        <div className="mt-10"></div>
      )}
      {currentItems.length == 0 ? (
        <SearchItemSkelton />
      ) : (
        <div
          ref={divRef}
          className={`grid  grid-cols-1 sm:grid-cols-3  gap-4 space-y-0.5 items-center mt-2 p-4 px-10  ${
            isMobile && "overflow-auto"
          }`}
        >
          {noResultsFound ? (
            <Image
              src={noResults}
              alt="noResultsFound"
              className="size-32 lg:size-44 ml-[120%]"
            />
          ) : (
            <>
              {currentItems.map((item: ServiceItem, index) => (
                <div
                  key={index}
                  className={` custom-scrollbar service-card relative ${
                    isDarkMode ? "bg-gray-700" : "bg-s"
                  }  rounded-2xl flex  shadow-2xl   h-[90px] overflow-hidden transition-transform duration-300 hover:-translate-y- p-2 cursor-pointer`}
                >
                  <div>
                    <Image
                      src={item.service_type_image_url}
                      alt={item.service_name}
                      width={200}
                      height={30}
                      className="w-32 h-full object-cover rounded-md"
                    />
                  </div>

                  <div
                    className={`  flex  justify-between  px-auto  ${
                      isDarkMode ? " text-gray-300" : "bg-white text-gray-800"
                    }    p-1 px-4`}
                  >
                    <div>
                      {" "}
                      <div className="flex justify-between items-center">
                        <p className=" dark:text-white mb-1 text-xs font-bold">
                          {item.service_type_name}
                        </p>
                      </div>
                      <p className="text-[10px] mb-1">
                        {item.service_type_description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      <div className="w-full flex justify-center items-center space-x-2 mt-3">
        {[...Array(totalPages)].map((_, index) => (
          <div
            key={index}
            className={`${
              currentBar === index
                ? `${isDarkMode ? "bg-gray-300" : "bg-gray-600"} `
                : `${isDarkMode ? "bg-gray-600" : "bg-gray-300"} `
            }  h-1 w-9 rounded-2xl cursor-pointer`}
            onClick={() => handleTabChange(index)}
          ></div>
        ))}
      </div>
    </>
  );
};

export default SearchModel;
