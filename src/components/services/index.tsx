import React from "react";
import Image from "../Image/image";

const serviceList = [
  {
    title: "AC Repair Services",
    description: "Quick, reliable fixes to keep your home perfectly cool year-round.",
    imageUrl: "https://ideogram.ai/assets/progressive-image/balanced/response/W6olkSP3RSyXHZGQKRvkKg",
  },
  {
    title: "AC Repair Services",
    description: "Quick, reliable fixes to keep your home perfectly cool year-round.",
    imageUrl: "https://ideogram.ai/assets/progressive-image/balanced/response/W6olkSP3RSyXHZGQKRvkKg",
  },
  {
    title: "AC Repair Services",
    description: "Quick, reliable fixes to keep your home perfectly cool year-round.",
    imageUrl: "https://ideogram.ai/assets/progressive-image/balanced/response/W6olkSP3RSyXHZGQKRvkKg",
  },
  {
    title: "Cab Services",
    description: "Safe and affordable rides whenever you need them",
    imageUrl: "https://ideogram.ai/assets/progressive-image/balanced/response/W6olkSP3RSyXHZGQKRvkKg",
  },
  {
    title: "Cab Services",
    description: "Safe and affordable rides whenever you need them",
    imageUrl: "https://ideogram.ai/assets/progressive-image/balanced/response/W6olkSP3RSyXHZGQKRvkKg",
  },
];

const Services = () => {
  return (
    <div className="flex flex-col space-y-6 justify-center items-center p-6 pt-10">
      <h1 className="text-2xl font-bold text-center text-gray-700 pb-6">
        Trusted Services, Right at Your Doorstep.
      </h1>

      {/* First Row (3 items) */}
      <div className="flex gap-4">
        {serviceList.slice(0, 3).map((service, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center w-48 p-4 rounded-lg shadow-2xl space-y-2 hover:-translate-y-3 hover:shadow-3xl transition-all cursor-pointer"
          >
            <img
              src={service.imageUrl}
              alt={service.title}
              className="w-20 h-16 rounded-lg"
            />
            <p className="text-sm font-semibold">{service.title}</p>
            <p className="text-xs text-center">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Second Row (2 items) */}
      <div className="flex gap-4">
        {serviceList.slice(3, 5).map((service, index) => (
          <div
            key={index + 3} // offset index so keys are unique
            className="flex flex-col justify-center items-center w-48 p-4 rounded-lg shadow-2xl space-y-2 hover:-translate-y-3 hover:shadow-3xl transition-all cursor-pointer"
          >
            <img
              src={service.imageUrl}
              alt={service.title}
              className="w-20 h-16 rounded-lg"
            />
            <p className="text-sm font-semibold">{service.title}</p>
            <p className="text-xs text-center">{service.description}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Services;
