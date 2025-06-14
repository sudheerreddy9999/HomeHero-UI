import { useState, useEffect } from "react";

const useIsMobile = (breakpoint: number = 768) => {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth <= breakpoint
  );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= breakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
