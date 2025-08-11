import React from "react";
import { useSkeletonThemeClasses } from "@/hooks/useSkeletonThemeClasses";

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
