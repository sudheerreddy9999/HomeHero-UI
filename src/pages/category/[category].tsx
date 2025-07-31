import React, { useEffect, useRef, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import SelectedCategory from "@/components/Category/SelectedCategory";
import CartSection from "@/components/Category/CartSection";
import CartMobileView from "@/components/Category/CartMobile.tsx";
import { useTheme } from "@/context/ThemeContext";
import { ServiceItem } from "@/types/serviceTypes";
import useIsMobile from "@/hooks/useIsMobile";
import MobileNonHome from "@/components/Nav/MobieNonHome";
import MostBookedServices from "@/components/MostBookedServices";
import { getCategoryItemsAction } from "@/store/actions/services";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { CategoryItemsSkeleton } from "@/components/skeletons";

const validCategories = ["acservices", "plumbing", "homecleaning", "electrical", "saloon"] as const;
type ValidCategory = (typeof validCategories)[number];


const categoryNumbers: Record<ValidCategory, number> = {
  acservices: 1,
  plumbing: 2,
  homecleaning: 3,
  electrical: 4,
  saloon: 5,
};

const categoryDisplayNames: Record<ValidCategory, string> = {
  acservices: "AC Services",
  plumbing: "Plumbing Services",
  homecleaning: "Home Cleaning Services",
  electrical: "Electrical Services",
  saloon: "Saloon Services",
};

interface CategoryPageProps {
  category: ValidCategory;
  selectedItems: ServiceItem[];
  number: number;
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
export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({ params }) => {
  const category = params?.category as ValidCategory;

  const selectedItems: ServiceItem[] = [];
  const number = categoryNumbers[category] ?? 0;

  return {
    props: {
      category,
      selectedItems,
      number,
    },
  };
};

const CategoryPage: React.FC<CategoryPageProps> = ({ number, category }) => {
  const { isDarkMode } = useTheme();
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const rightRef = useRef<HTMLDivElement>(null);
  const [rightHeight, setRightHeight] = useState(0);

  const { categoryItems, serviceLoading } = useAppSelector((state) => state.services);

  const dynamicMessage = `Selected ${categoryDisplayNames[category]}`;

  useEffect(() => {
    if (number > 0) {
      const payload = {
        headers: {
          service_id: String(number),
        },
      };
      dispatch(getCategoryItemsAction(payload));
    }
  }, [number, dispatch]);

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

  return (
    <>
      {isMobile && <MobileNonHome message={dynamicMessage} route="/" />}

      <div className={`sm:pt-10 p-3 sm:px-10 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="w-full flex flex-col md:flex-row space-y-5 md:space-y-0 justify-between mt-12 sm:mt-10">
          <div
            className="w-full md:w-[67%]"
            style={{ height: rightHeight ? `${rightHeight}px` : "auto" }}
          >
            {categoryItems.length > 0 && serviceLoading ? (
              <SelectedCategory selectedItems={categoryItems} height={rightHeight} />
            ) : (
              <CategoryItemsSkeleton />
            )}
          </div>

          <div className="w-full md:w-[30%]" ref={rightRef}>
            <div className="w-full hidden sm:block">
              <CartSection />
            </div>
            <div className="block sm:hidden">
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
