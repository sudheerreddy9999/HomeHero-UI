import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import SelectedCategory from "@/components/Category/SelectedCategory";
import CartSection from "@/components/Category/CartSection";
import CartMobileView from "@/components/Category/CartMobile.tsx";
import { useTheme } from "@/context/ThemeContext";
import { acServices } from "@/Jsons/acServives";
import { ServiceItem } from "@/types/serviceTypes";

const validCategories = ["acservice"];
interface CategoryPageProps {
  category: string;
  selectedItems: ServiceItem[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = validCategories.map((category) => ({
    params: { category },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({
  params,
}) => {
  const category = params?.category as string;
  let selectedItems: ServiceItem[] = [];
  if (category === "acservice") {
    selectedItems = acServices.map((item) => ({
      ...item,
      image: {
        ...item.image,
        blurDataURL: item.image.blurDataURL ?? "",
      },
    }));
  }

  return {
    props: {
      category,
      selectedItems,
    },
  };
};

const CategoryPage: React.FC<CategoryPageProps> = ({ selectedItems }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`sm:pt-14 sm:py-6 p-3 sm:px-10 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      } min-h-screen`}
    >
      <div className="w-full flex flex-col md:flex-row space-y-5 md:space-y-0 justify-between sm:mt-10">
        <div className="w-full md:w-[67%]">
          <SelectedCategory selectedItems={selectedItems} />
        </div>
        <div className="w-full md:w-[30%]">
          <div className="w-full hidden sm:block">
            <CartSection />
          </div>
          <div className="block sm:hidden ">
            <CartMobileView />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
