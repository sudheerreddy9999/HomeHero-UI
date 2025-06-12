import React, { useState, useEffect } from "react";
import Image from "@/components/Image/image";
import CloseIcon from "@/assets/icons/close.png";
import useGeolocation from "@/hooks/useGeolocation";

type LocationSearchProps = {
  onSelectLocation: (address: string) => void;
  onclose: () => void;
};

const LocationSearch = ({ onSelectLocation, onclose }: LocationSearchProps) => {
  const { nearbyTowns } = useGeolocation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    { formatted: string; geometry: { lat: number; lng: number } }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);


  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchData = async () => {
        if (query.trim().length > 2) {
          setLoading(true);
          try {
            const res = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
                query
              )}&key=${process.env.NEXT_PUBLIC_GEO_LOCATION}`
            );
            const data = await res.json();
            setResults(data.results || []);
            setSearchPerformed(true);
          } catch (err) {
            console.error("Location search failed:", err);
            setResults([]);
          } finally {
            setLoading(false);
          }
        } else {
          setResults([]);
          setSearchPerformed(false);
        }
      };

      fetchData();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="fixed inset-0 w-full bg-opacity-90 flex items-center justify-center z-50">
      <div className="flex flex-col justify-center w-[75%] sm:w-[34%] h-6/12 rounded-md shadow-2xl bg-white items-center">
        <div className="flex justify-end w-full p-3">
          <Image
            src={CloseIcon}
            alt="CloseIcon"
            className="size-7 cursor-pointer"
            onClick={onclose}
          />
        </div>
        <div className="p-4 w-full">
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="text"
              placeholder="Search location..."
              className="outline-none border-none text-[16px] px-3  w-full mb-1 dark:text-black"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {nearbyTowns.length > 0 && (
            <div className="mb-4">
              <ul className="list-disc">
                {nearbyTowns.map((town, index) => (
                  <ol
                    key={index}
                    className="text-sm cursor-pointer hover:bg-gray-50 hover:-translate-y-0.5 hover:p-2.5 hover:rounded-md text-gray-700 p-2 border-b"
                    onClick={() => onSelectLocation(town)}
                  >
                    {town}
                  </ol>
                ))}
              </ul>
            </div>
          )}

          <ul className="mt-2 h-[130px] overflow-y-auto">
            {loading ? (
              <li className="text-gray-400 text-sm">Searching...</li>
            ) : searchPerformed && results.length === 0 ? (
              <li className="text-gray-500 text-sm italic">
                No results found.
              </li>
            ) : (
              results.map((result, index) => (
                <ol
                  key={index}
                  className="text-sm cursor-pointer hover:bg-gray-50 space-y-7 hover:translate-y-0.5 hover:p-2.5 hover:rounded-md text-gray-700 p-2 border-b"
                  onClick={() => onSelectLocation(result.formatted)}
                >
                  {result.formatted}
                </ol>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
