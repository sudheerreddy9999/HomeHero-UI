import React, {  useEffect, useState } from "react";
import useGeolocation from "@/hooks/useGeolocation";
import Image from "@/components/Image/image";
import locationIcon from "@/assets/icons/location-pin.png";
import DropDownArrow from "@/assets/icons/DropDown-Arrow.png";
import LocationSearch from "@/components/Nav/location/LocationSerach";

const Location = () => {
  const { location, address, error } = useGeolocation();
  const [preciseLocation, setPreciseLocation] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState<{
    address: string;
  } | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      const parts = selectedLocation.address.split(",");
      if (isMobile) {
        if (openSearch) {
          setOpenSearch(false);
        }
        return setPreciseLocation(parts[0]);
      }
      setPreciseLocation(selectedLocation.address);
      if (openSearch) {
        setOpenSearch(false);
      }
    }
  }, [selectedLocation,isMobile]);
  const getPreciseLocation = (address: string | null | undefined) => {
    if (!address) return "";
    const parts = address.split(",");
    if (isMobile) {
      return parts[0];
    }
    return parts.length >= 2 ? `${parts[0]}, ${parts[1]}` : address;
  };

  useEffect(() => {
    if (address) {
      const precise = getPreciseLocation(address);
      setPreciseLocation(precise);
    }
  }, [location, address]);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-4 rounded  text-sm ">
      {location ? (
        <div className={`flex justify-center bg-white items-center space-x-2 ${isMobile?"p-1":"p-3"} border-[1px] border-[#53c9c2] rounded-full dark:bg-white dark:text-black`}>
          <Image src={locationIcon} alt="locationIcon" className={`${isMobile?"size-3":"size-4.5"} cursor-pointer`} />
          <p className="text-[13px]">
            {preciseLocation || "Loading address..."}
          </p>
          <Image
            src={DropDownArrow}
            alt="locationIcon"
            className={`${isMobile?"size-3":"size-4.5"} cursor-pointer`}
            onClick={() => setOpenSearch(true)}
          />
        </div>
      ) : (
        <p>Getting your location...</p>
      )}
      {openSearch && (
        <LocationSearch
          onSelectLocation={(address) => {
            setSelectedLocation({ address });
          }}
          onclose={() => setOpenSearch(false)}
        />
      )}
    </div>
  );
};

export default Location;
