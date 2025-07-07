import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import useIsMobile from "@/hooks/useIsMobile";
import Link from "next/link";
type seachProps = {
  heading: string;
  seachPlaceholder: string;
};

const Search = ({ heading, seachPlaceholder }: seachProps) => {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        <div className="w-full  flex justify-between items-center relative mb-4">
            <div className="flex items-center justify-between space-x-3">
                <Link href="/">
                <IoArrowBack size={30}/>
                </Link>
                <h2 className="text-medium font-semibold text-center">{heading}</h2>
            </div>
            <div><CiSearch className="cursor-pointer" size={25} /></div>
        </div>
      ) : (
        <div className=" flex flex-col-reverse w-[97%]  sm:flex-row justify-between items-end sm:items-center">
          <h2 className="text-2xl font-semibold text-center">{heading}</h2>
          <div className="relative w-[70%] sm:w-[20%] flex items-center">
            <CiSearch className="absolute left-2" size={20} />
            <input
              type="text"
              placeholder={seachPlaceholder}
              className="w-full p-2 pl-9 border rounded-lg border-gray-300  focus:outline-none focus:ring-1"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
