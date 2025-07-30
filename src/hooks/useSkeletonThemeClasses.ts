import { useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";

export const useSkeletonThemeClasses = () => {
  const { isDarkMode } = useTheme();

  const classes = useMemo(() => {
    return {
      bgCard: isDarkMode ? "bg-gray-800" : "bg-white",
      bgBlock: isDarkMode ? "bg-gray-700" : "bg-gray-300",
    };
  }, [isDarkMode]);

  return classes;
};
