import React from "react";

const comboData = [
  {
    title: "Home Cleaning + AC Repair",
    price: "₹999",
    originalPrice: "₹1499",
    description:
      "Thorough home cleaning with surface sanitization and AC cooling optimization for summer comfort.",
    validTill: "July 31",
    notes: "Only for residential homes.",
    image:
      "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
  },
  {
    title: "Pest Control + Water Tank",
    price: "₹799",
    originalPrice: "₹1299",
    description:
      "Get rid of pests with odorless treatment and ensure clean, healthy water with tank disinfection.",
    validTill: "Aug 15",
    notes: "Valid for 2/3BHK homes only.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpu6I5I7ThZqqnZ9TLcF9UxIglJc_z_leEYzdW9VrD7nD8nWPcgA6Ym63g2FJt9p4gGcA&usqp=CAU",
  },
  {
    title: "Sofa Cleaning + Carpet Shampoo",
    price: "₹699",
    originalPrice: "₹1099",
    description:
      "Deep vacuuming and stain removal to refresh your sofa and carpet with eco-friendly solutions.",
    validTill: "July 30",
    notes: "Includes 5-seater & 1 carpet.",
    image: "https://tinypng.com/images/social/website.jpg",
  },
  {
    title: "Home Cleaning + AC Repair",
    price: "₹999",
    originalPrice: "₹1499",
    description:
      "Thorough home cleaning with surface sanitization and AC cooling optimization for summer comfort.",
    validTill: "July 31",
    notes: "Only for residential homes.",
    image:
      "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
  },
];

const ComboPackages = () => {
  return (
    <section className="w-full px-6 py-10">
      <div className="mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Combo Packages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {comboData.map((combo, index) => {
            const saved =
              parseInt(combo.originalPrice.replace("₹", "")) -
              parseInt(combo.price.replace("₹", ""));

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-5 pt-10 flex flex-col border border-gray-100 h-full"
              >
                <img
                  src={combo.image}
                  alt={combo.title}
                  className="w-10/12 h-32 object-cover rounded-t-[30px] rounded-b-[70px] border-2 border-gray-200 mx-auto mt-[-16px]"
                />

                {/* Make this section grow to fill remaining height */}
                <div className="flex flex-col justify-between text-sm text-gray-700 flex-1 mt-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-800">
                      {combo.title}
                    </h3>
                    <p className="text-gray-600 text-xs mt-1">
                      {combo.description}
                    </p>

                    <div className="mt-2 flex flex-col gap-1 text-xs">
                      <span className="text-green-600 font-medium">
                        Save ₹{saved}
                      </span>
                      <span className="text-red-500 font-medium">
                        Valid till {combo.validTill}
                      </span>
                      <span className="text-gray-400 italic">
                        Note: {combo.notes}
                      </span>
                    </div>
                  </div>

                  {/* Push this section to bottom */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-indigo-600 font-bold text-base">
                      {combo.price}
                      <span className="text-gray-400 line-through text-sm ml-2">
                        {combo.originalPrice}
                      </span>
                    </div>
                    <button className="bg-[#53c9c2] text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ComboPackages;
