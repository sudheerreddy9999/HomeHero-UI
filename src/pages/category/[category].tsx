import { useRouter } from "next/router";
import React from "react";
import Search from "@/components/Search";

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;

  return (
    <div className="sm:mt-10 sm:py-10 p-3 sm:p-6">
      <Search 
      heading = "AC Service and Repair"
      seachPlaceholder = "Search for AC services, repair, etc."
      />
      <h1>{category}</h1>
    </div>
  );
};

export default CategoryPage;
