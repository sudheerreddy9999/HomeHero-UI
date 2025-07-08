// import { useRouter } from "next/router";
import React from "react";
// import Search from "@/components/Search";
import SelectedCategory from "@/components/Category/SelectedCategory";
import { acServices } from "@/Jsons/acServives";
import CartSection from "@/components/Category/CartSection";
import CartMobileView from "@/components/Category/CartMobile.tsx";

const CategoryPage = () => {
  console.log(acServices, "Ac Services are ");
  // const router = useRouter();
  // const { category } = router.query;

  return (
    <div className="sm:mt-10 sm:py-6  p-3   sm:mx-10" >
      {/* <div className="fixed w-full pr-4  md:pr-20">
        <Search
          heading="AC Service and Repair"
          seachPlaceholder="Search for AC services, repair, etc."
        />
      </div> */}
      <div className="w-full flex flex-col md:flex-row space-y-5 md:space-y-0 justify-between  mt-10">
        <div className=" w-full md:w-[67%] ">
          <SelectedCategory selectedItems={acServices} />
        </div>
        <div className="w-full md:w-[30%] ">
          <div className="w-full hidden sm:block ">
          <CartSection />
        </div>
        <div className=" block sm:hidden">
          <CartMobileView/>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
