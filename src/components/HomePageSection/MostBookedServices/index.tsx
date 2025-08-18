import React, { useRef, useState, useEffect } from "react";
import { IoStar } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "../../Image/image";
import { useTheme } from "@/context/ThemeContext";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getTrendingServices } from "@/store/actions/services";
import { ServiceItem, serviceTypes } from "@/types/serviceTypes";
import { useRouter } from "next/router";

const MostBookedServices = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const dispatch = useAppDispatch();
  const { trending } = useAppSelector((state) => state.services);
  const { services } = useAppSelector((state) => state.services) as {
    services: serviceTypes[];
  };

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.offsetWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = direction === "left" ? -300 : 300;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleRoute = (service_id: number, service_type_id: number) => {
    const match = services.find((c) => c.id === service_id);

    if (!match || !("route" in match)) return;

    router.push({
      pathname: (match as { route: string }).route,
      query: {
        serviceItem: service_type_id,
        ref: "homepage",
      },
    });
  };

  useEffect(() => {
    if (trending.length <= 0) {
      dispatch(getTrendingServices());
    }
  }, [trending,dispatch]);

  return (
    <div
      className={`relative w-full px-4 py-6 ${
        isDarkMode ? " text-white bg-gray-900" : " text-gray-700 "
      }`}
    >
      <h2 className=" sm:text-2xl  font-[600] mb-4 ">Most Booked Services</h2>
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className={`hidden sm:flex absolute left-2 top-1/2 z-10 -translate-y-1/2 ${
            isDarkMode ? "bg-black" : "bg-white"
          } shadow-md p-2 rounded-full cursor-pointer`}
        >
          <FaChevronLeft />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className={`hidden sm:flex absolute right-2 top-1/2 z-10 -translate-y-1/2 ${
            isDarkMode ? "bg-black" : "bg-white"
          } shadow-md p-2 rounded-full hover:p-2.5 cursor-pointer`}
        >
          <FaChevronRight />
        </button>
      )}
      <div
        ref={scrollRef}
        className=" custom-scrollbar flex gap-4 overflow-x-auto scroll-smooth no-scrollbar "
        style={{
          scrollSnapType: "x mandatory",
        }}
      >
        {trending.length > 0 ? (
          <>
            {trending.map((service: ServiceItem) => (
              <div
                key={service.service_type_id}
                className={`most-booked flex-shrink-0 w-[190px] sm:w-[280px] md:w-[300px] snap-start rounded-lg hover:-translate-y-1 transition-transform duration-200 ease-in-out cursor-pointer ${
                  isDarkMode ? " text-gray-200" : " text-gray-800"
                }`}
              >
                <div
                  className="h-36 sm:h-48 relative"
                  onClick={() =>
                    handleRoute(service.service_id, service.service_type_id)
                  }
                >
                  <Image
                    src={service.service_type_image_url}
                    alt={service.service_type_name}
                    width={100}
                    height={100}
                    className="rounded-t-lg w-full h-full object-cover"
                  />
                </div>
                <div className="p-2 ">
                  <h3 className="service-name mb-1 text-xs sm:text-medium font-semibold ">
                    {service.service_type_name}
                  </h3>
                  <div className="flex justify-between items-center text-sm">
                    <p className=" flex items-center gap-1">
                      <IoStar className="text-yellow-500" />
                      {service.service_id} / 5
                    </p>
                    <p className="">
                      <span className="price line-through mr-1">
                        ₹{service.price}
                      </span>
                      <span className="font-semibold text-xs md:text-[16px] pl-1">
                        ₹{service.offerPrice}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MostBookedServices;
