import React from "react";
import useGeolocation from "@/hooks/useGeolocation";

const Location = () => {
       const { location, address, error } = useGeolocation();
       console.log(address, "address");
    return(
        <>
              {location ? (
        <div className=" p-4 rounded text-sm mt-2">
          {/* <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>Accuracy: {location.accuracy.toFixed(2)} meters</p> */}
          {/* <p className="mt-2 font-medium">Address:</p> */}
          <p>{address || 'Loading address...'}</p>
        </div>
      ) : (
        !error && <p>Getting your location...</p>
      )}
        </>
    )
}

export default Location;