import React,{useState,useEffect} from "react";
import { CiSearch } from "react-icons/ci";
// import { IoArrowBack } from "react-icons/io5";
import useIsMobile from "@/hooks/useIsMobile";
import { useTheme } from "@/context/ThemeContext";
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
  placeholders.push(seachPlaceholder || "Search for services");
  const { isDarkMode } = useTheme();
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000); 

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <>
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
            <CiSearch className="cursor-pointer absolute right-3 bottom-2" size={25} />
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
    </>
  );
};

export default Search;
