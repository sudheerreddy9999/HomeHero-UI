import React, { useEffect, useRef, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import SelectedCategory from "@/components/Category/SelectedCategory";
import CartSection from "@/components/Category/CartSection";
import CartMobileView from "@/components/Category/CartMobile.tsx";
import { useTheme } from "@/context/ThemeContext";
import { acServices } from "@/Jsons/acServives";
import { ServiceItem } from "@/types/serviceTypes";
import useIsMobile from "@/hooks/useIsMobile";
import MobileNonHome from "@/components/Nav/MobieNonHome";
import MostBookedServices from "@/components/MostBookedServices";

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
  const isMobile = useIsMobile();
  const rightRef = useRef<HTMLDivElement>(null);
  const [rightHeight, setRightHeight] = useState(0);
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newHeight = entry.contentRect.height;
        setRightHeight(newHeight);
      }
    });

    if (rightRef.current) {
      observer.observe(rightRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  console.log(rightHeight, "Heifhr isnnsn");

  return (
    <>
      {isMobile && <MobileNonHome message="Selected AC Services" route="/" />}

      <div
        className={`sm:pt-10  p-3 sm:px-10 ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        } `}
      >
        <div className="w-full flex flex-col md:flex-row space-y-5 md:space-y-0 justify-between mt-12 sm:mt-10">
          <div
            className="w-full md:w-[67%] "
            style={{ height: rightHeight ? `${rightHeight}px` : "auto" }}
          >
            <SelectedCategory
              selectedItems={selectedItems}
              height={rightHeight}
            />
          </div>
          <div className="w-full md:w-[30%]" ref={rightRef}>
            <div className="w-full hidden sm:block">
              <CartSection />
            </div>
            <div className="block sm:hidden ">
              <CartMobileView />
            </div>
          </div>
        </div>
      </div>
      {!isMobile && <MostBookedServices />}
    </>
  );
};

export default CategoryPage;
