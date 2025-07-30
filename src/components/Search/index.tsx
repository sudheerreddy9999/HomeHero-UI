import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
// import { IoArrowBack } from "react-icons/io5";
import useIsMobile from "@/hooks/useIsMobile";
import { useTheme } from "@/context/ThemeContext";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { ServiceItem } from "@/types/serviceTypes";
import Image from "../Image/image";
import { getCategoryItemsAction } from "@/store/actions/services";
// import Link from "next/link";
type seachProps = {
  heading?: string;
  place?: string;
  seachPlaceholder?: string;
};
const placeholders = [
  "Search for ac repair",
  "Search for pipe repair",
  "Search for carpet cleaning",
  "Search for  electrician",
  "Search for plumber",
];

const Search = ({ heading, seachPlaceholder, place }: seachProps) => {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  placeholders.push(seachPlaceholder || "Search for services");
  const { isDarkMode } = useTheme();
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [opensearchModel, setOpenSearchModel] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { categoryItems } = useAppSelector((state) => state.services);

  const handleInputClick = () => {
    setOpenSearchModel(true);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenSearchModel(false);
      }
    };

    if (opensearchModel) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [opensearchModel]);

  useEffect(() => {
    if (!(categoryItems.length > 0)) {
      const payload = {
        headers: {
          service_id: String(1),
        },
      };
      dispatch(getCategoryItemsAction(payload));
    }
  }, [dispatch]);

  return (
    <div>
      {isMobile ? (
        <div className="w-full relative  flex justify-between  items-center  mb-4">
          {/* <div className="flex items-center justify-between space-x-3">
            <Link href="/">
              <IoArrowBack size={30} />
            </Link>
            <h2 className="text-medium font-semibold text-center">{heading}</h2>
          </div> */}
          <input
            type="text"
            placeholder={placeholders[placeholderIndex]}
            className={`w-full border  ${
              place === "navbar"
                ? "rounded-2xl focus:outline-none  p-2.5 pl-9"
                : "rounded-lg  p-2 pl-9"
            } border-gray-300 ${
              isDarkMode ? "text-white" : "text-black"
            }  focus:outline-none focus:ring-1`}
          />
          <div>
            <CiSearch
              className="cursor-pointer absolute right-3 bottom-2"
              size={25}
            />
          </div>
        </div>
      ) : (
        <div className=" flex flex-col-reverse w-[97%] ml-28  sm:flex-row justify-between items-end sm:items-center">
          <h2 className="text-2xl font-semibold text-center">{heading}</h2>
          <div
            className={`relative w-[70%] ${
              place == "navbar" ? "sm:w-full rounded-3xl" : "sm:w-[20%]"
            }  flex items-center`}
          >
            <CiSearch
              className={`absolute left-2  ${
                isDarkMode ? "text-white" : "text-black"
              } ${place == "navbar" ? "text-black" : ""} `}
              size={20}
            />
            <input
              type="text"
              placeholder={placeholders[placeholderIndex]}
              onClick={handleInputClick}
              className={`w-full border  ${
                place === "navbar"
                  ? "rounded-2xl focus:outline-none  p-2.5 pl-9"
                  : "rounded-lg  p-2 pl-9"
              } border-gray-300 ${
                isDarkMode ? "text-white" : "text-black"
              }  focus:outline-none focus:ring-1`}
            />
          </div>
        </div>
      )}
      {opensearchModel && (
        <div className="fixed inset-0 w-full bg-opacity-90 flex mt-16 justify-center z-999">
          <div
            className="flex flex-col  w-[70%] sm:w-[70%] h-9/12 rounded-md shadow-2xl bg-white "
            ref={modalRef}
          >
            <div className="grid grid-cols-3 gap-4  items-center mt-2 p-4">
              {categoryItems.map((item: ServiceItem) => (
                <div
                  key={item.service_id}
                  className={` custom-scrollbar service-card relative ${
                    isDarkMode ? "bg-gray-700" : "bg-white"
                  }  rounded-2xl flex  shadow-xl h-20 overflow-hidden transition-transform duration-300 hover:scale-[1.02]`}
                >
                  <div>
                    <Image
                      src={item.service_type_image_url}
                      alt={item.service_name}
                      width={200}
                      height={40}
                      className="w-32 h-full object-cover"
                    />
                  </div>

                  <div
                    className={`  flex  justify-between  px-auto  ${
                      isDarkMode
                        ? "bg-zinc-800/80 text-white"
                        : "bg-white text-gray-800"
                    }    rounded-2xl p-4  shadow-md`}
                  >
                    <div>
                      {" "}
                      <div className="flex justify-between items-center">
                        <p className=" dark:text-white mb-1">
                          {item.service_name}
                        </p>
                      </div>
                      <p className="text-xs mb-1">{item.description}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="description font-semibold">
                          ₹{item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
