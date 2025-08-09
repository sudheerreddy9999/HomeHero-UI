import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import useIsMobile from "@/hooks/useIsMobile";
import { useTheme } from "@/context/ThemeContext";

import SearchModel from "./SearchModel";
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
  placeholders.push(seachPlaceholder || "Search for services");
  const { isDarkMode } = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [opensearchModel, setOpenSearchModel] = useState(false);
  const handleInputClick = () => {
    setOpenSearchModel(true);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(interval);
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

  return (
    <div>
      {isMobile ? (
        <div className="w-full relative  flex justify-between  items-center  mb-4">
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
          <h1>Hello Sudheer</h1>
        </div>
      ) : (
        <div
          className={` flex flex-col-reverse w-[97%] ml-28 ${
            opensearchModel && "hidden"
          } sm:flex-row justify-between items-end sm:items-center`}
        >
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
        <div className="fixed inset-0 w-full bg-opacity-90 flex mt-16 justify-center  z-999 transition-opacity duration-300 ease-in-out">
          <div
            className=" transform transition-all duration-300 ease-in-out scale-95  animate-fadeInUp flex flex-col bg-white   w-[70%] sm:w-[55%] py-4 pt-7 h-10/12 rounded-2xl shadow-2xl "
            ref={modalRef}
          >
            <SearchModel />
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
