import React, { useRef, useState, useEffect } from "react";
import AcImage from "@/assets/MostBookedServices/ac-reaparing.jpg";
import { IoStar } from "react-icons/io5";
import WallMount from "@/assets/MostBookedServices/wallMount.jpg";
import geaser from "@/assets/MostBookedServices/geaser.jpg";
import waterPurifier from "@/assets/MostBookedServices/water-purifier.jpg";
import tapFix from "@/assets/MostBookedServices/tap-fix.jpg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "../Image/image";
import { useTheme } from "@/context/ThemeContext";

const services = [
  {
    id: 1,
    name: "AC Repair & Gas Refill",
    image: AcImage,
    price: 799,
    offerPrice: 599,
    rating: 4.5,
  },
  {
    id: 7,
    name: "LED TV Wall Mount",
    image: WallMount,
    price: 499,
    offerPrice: 349,
    rating: 4.6,
  },
  {
    id: 5,
    name: "Geyser Installation",
    image: geaser,
    price: 899,
    offerPrice: 699,
    rating: 4.3,
  },
  {
    id: 4,
    name: "RO Water Purifier Service",
    image: waterPurifier,
    price: 599,
    offerPrice: 449,
    rating: 4.4,
  },
  {
    id: 2,
    name: "Bathroom Tap & Pipe Fix",
    image: tapFix,
    price: 499,
    offerPrice: 349,
    rating: 4.2,
  },
];

const MostBookedServices = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { isDarkMode } = useTheme();

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

  return (
    <div
      className={`relative w-full px-4 py-6 ${
        isDarkMode ? " text-white bg-gray-900" : " text-gray-700 bg-white "
      }`}
    >
      <h2 className="text-xl sm:text-2xl  font-semibold mb-4 ">Most Booked Services</h2>
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
        {services.map((service) => (
          <div
            key={service.id}
            className={`most-booked flex-shrink-0 w-[190px] sm:w-[280px] md:w-[300px] snap-start rounded-lg hover:-translate-y-1 transition-transform duration-200 ease-in-out ${
              isDarkMode ? " text-gray-200" : " text-gray-800"
            }`}
          >
            <div className="h-36 sm:h-48 relative">
              <Image
                src={service.image}
                alt={service.name}
                className="rounded-t-lg w-full h-full object-cover"
              />
            </div>
            <div className="p-2 ">
              <h3 className="service-name mb-1 text-sm sm:text-medium font-semibold ">
                {service.name}
              </h3>
              <div className="flex justify-between items-center text-sm">
                <p className=" flex items-center gap-1">
                  <IoStar className="text-yellow-500" />
                  {service.rating} / 5
                </p>
                <p className="">
                  <span className="price line-through mr-1">₹{service.price}</span>
                  <span className="font-semibold text-xs md:text-[16px] pl-1">
                    ₹{service.offerPrice}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostBookedServices;
