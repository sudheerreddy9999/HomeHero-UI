import React from "react";
import { useSkeletonThemeClasses } from "@/hooks/useSkeletonThemeClasses";
import useIsMobile from "@/hooks/useIsMobile";
export const CategoryItemsSkeleton = () => {
  const { bgCard, bgBlock } = useSkeletonThemeClasses();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className={`mx-auto w-full max-w-sm rounded-md shadow-md p-4 ${bgCard}`}
        >
          <div className={`w-full h-28 rounded-md ${bgBlock}`}></div>
          <div className="flex animate-pulse space-x-4 mt-2">
            <div className="flex-1 space-y-3 py-1">
              <div className={`h-4 rounded ${bgBlock}`}></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className={`col-span-2 h-4 rounded ${bgBlock}`}></div>
                  <div className={`col-span-1 h-4 rounded ${bgBlock}`}></div>
                </div>
                <div className={`h-2 rounded ${bgBlock}`}></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ServicesHomePageSkelton = () => {
  const { bgCard, bgBlock } = useSkeletonThemeClasses();

  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className={`mx-auto w-[220px] max-w-sm rounded-2xl shadow-md p-4 ${bgCard}`}
        >
          <div className={`w-12 h-12 rounded-full  m-auto ${bgBlock}`}></div>
          <div className="flex animate-pulse space-x-4 mt-2">
            <div className="flex-1 space-y-3 py-1">
              <div className={`h-4.5 w-10/12 mx-auto rounded ${bgBlock}`}></div>
              <div className="space-y-1">
                {/* <div className="grid grid-cols-3 gap-4">
                  <div className={`col-span-2 h-4 rounded ${bgBlock}`}></div>
                  <div className={`col-span-1 h-4 rounded ${bgBlock}`}></div>
                </div> */}
                <div className={`h-2.5 rounded ${bgBlock}`}></div>
                <div
                  className={`h-2.5 w-10/12 mx-auto rounded ${bgBlock}`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const SearchItemSkelton = () => {
  const { bgCard, bgBlock } = useSkeletonThemeClasses();
  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 p-3 ">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className={`mx-auto w-full h-[90px] rounded-2xl shadow-2xl  ${bgCard}`}
        >
          <div className="flex p-2 h-full w-full space-x-1.5">
            {" "}
            <div
              className={`w-3/12 h-full ${bgBlock} animate-pulse rounded-md`}
            ></div>{" "}
            <div
              className={`w-10/12 h-full rounded-md animate-pulse ${bgBlock}`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const MostBookedSevicesSkeleton = () => {
  const { bgBlock } = useSkeletonThemeClasses();
  const isMobile = useIsMobile();

  return (
    <div
      className={` ${
        isMobile ? "flex overflow-x-scroll" : "grid grid-cols-5 w-full"
      } `}
    >
      {Array.from({ length: isMobile ? 2 : 5 }).map((_, index) => (
        <div
          key={index}
          className={` ${
            isMobile && "w-[210px]"
          } h-[180px] md:h-[220px]   flex-shrink-0`}
        >
          <div className="flex flex-col p-2 h-full w-full space-x-1.5 space-y-1.5 ">
            <div
              className={`w-full h-full ${bgBlock} animate-pulse rounded-md`}
            ></div>
            <div
              className={`w-6/12 h-1/12 rounded-md animate-pulse ${bgBlock}`}
            ></div>
            <div
              className={`w-full h-1/12 rounded-md animate-pulse ${bgBlock}`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ComboPackagesSkeleton = () => {
  const { bgCard, bgBlock } = useSkeletonThemeClasses();
  const isMobile = useIsMobile();

  return (
    <div
      className={` ${
        isMobile
          ? "flex overflow-x-scroll gap-4"
          : " w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
      } `}
    >
      {Array.from({ length: isMobile ? 2 : 4 }).map((_, index) => (
        <div
          key={index}
          className={`${
            isMobile && "w-[240px]"
          }  max-w-sm rounded-md flex-shrink-0 shadow-md p-4 ${bgCard}`}
        >
          <div
            className={`w-11/12 md:w-9/12 mx-auto h-24 md:h-32 rounded-t-[30px] rounded-b-[70px] rounded-md ${bgBlock}`}
          ></div>
          <div className="flex animate-pulse space-x-4 mt-2">
            <div className="flex-1 space-y-3 py-1">
              <div className={`h-4 w-10/12 rounded ${bgBlock}`}></div>
              <div className="space-y-3">
                <div className={`h-3 rounded ${bgBlock}`}></div>
                <div className="flex justify-between  mx-auto">
                  <div
                    className={` w-20 md:w-28 h-6 md:h-8 rounded ${bgBlock}`}
                  ></div>
                  <div
                    className={`w-16 md:w-20 h-6 md:h-8 rounded ${bgBlock}`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
