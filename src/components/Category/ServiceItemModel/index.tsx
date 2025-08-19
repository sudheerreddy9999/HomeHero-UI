import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { ServiceItem } from "@/types/serviceTypes";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import Image from "@/components/Image/image";
import { IoIosTimer } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";

interface ServiceItemModelProps {
  serviceModelItem: ServiceItem;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceItemModel: React.FC<ServiceItemModelProps> = ({
  isOpen,
  serviceModelItem,
  onClose,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-[999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`relative flex flex-col justify-center w-full sm:w-[60%] md:w-[50%] lg:w-[40%] min-h-[60vh] rounded-2xl shadow-2xl overflow-hidden ${
              isDarkMode
                ? "bg-gray-900 text-gray-200"
                : "bg-white text-gray-800"
            }`}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={onClose}
            >
              <IoClose size={28} />
            </button>
            <div className="w-full h-56 relative">
              <Image
                src={serviceModelItem.service_type_image_url}
                alt={serviceModelItem.service_type_name}
                fill
                className="object-cover"
                unoptimized
              />
              {serviceModelItem.service_id > 0 && (
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {serviceModelItem.service_type_id}% OFF
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 p-6">
              <h2 className="text-2xl font-bold">
                {serviceModelItem.service_type_name}
              </h2>
              <p className="text-sm opacity-80">
                {serviceModelItem.description}
              </p>
              <p className="text-xs opacity-80">
                {serviceModelItem.service_type_description} is simply dummy text
                of the printing and typesetting industry. Lorem Ipsum has been
                the industry standard dummy text ever since the 1500s when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book. It&apos;s widely used today.
              </p>

              <p className="text-sm font-medium opacity-70 flex space-x-2">
                <IoIosTimer size={16} className="mt-0.5 mr-1" /> Duration:{" "}
                {serviceModelItem.duration_minutes} mins
              </p>
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-gray-600">
                  ₹{serviceModelItem.offerPrice}
                </span>
                <span className="line-through text-gray-400 text-sm">
                  ₹{serviceModelItem.price}
                </span>
              </div>
              <div className="flex justify-end items-center hover:text-blue-400 cursor-pointer text-sm">
                View Reviews <MdKeyboardArrowDown size={24} />
              </div>
              <div className="flex justify-end">
                <button className="mt-4 w-4/12 md:w-1/4 items-center cursor-pointer bg-[#53c9c2] hover:bg-[#44f4eb] text-white px-6 py-3 text-xs sm:text-sm rounded-xl font-medium transition">
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceItemModel;
