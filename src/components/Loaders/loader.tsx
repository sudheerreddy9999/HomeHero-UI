import React from "react";
import Image from "../Image/image";
import HeroIcon from "../../assets/heroicon.svg"

type LoaderProps = {
  message?:string;
}
const Loader = ({ message }: LoaderProps) => {
  return (
    <div className="fixed inset-0 w-full bg-opacity-90 flex items-center justify-center z-999">
      <div className="flex flex-col justify-center w-[70%] sm:w-[20%] h-4/12 rounded-md shadow-2xl bg-white items-center">
        <Image src={HeroIcon} className="w-20 animate-bounce" alt="Loader" />
        
        <div className="flex items-center mt-2">
          {message ? (
            <>
              <p className="text-md text-gray-600 px-2 font-semibold">{message}</p>
              <span className="loading loading-dots loading-md"></span>
            </>
          ) : (
            <span className="loading loading-dots loading-md"></span>
          )}
        </div>
      </div>
    </div>
  );
};


export default Loader;
