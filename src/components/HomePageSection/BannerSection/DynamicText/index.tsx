import React, { useState, useEffect, useMemo } from "react";

const DynamicText = () => {
  const headings = useMemo(
    () => [
      {
        static: "Everything You Need,",
        dynamic: "All in One Place.",
      },
      {
        static: "Trusted Services,",
        dynamic: "Right at Your Doorstep.",
      },
      {
        static: "Reliable Help",
        dynamic: "for Every Need.",
      },
    ],
    []
  );
  const [headingIndex, setHeadingIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [loopCompleted, setLoopCompleted] = useState(false);
  useEffect(() => {
    if (loopCompleted) return;

    const currentDynamic = headings[headingIndex].dynamic;

    if (charIndex < currentDynamic.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + currentDynamic[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        if (headingIndex === headings.length - 1) {
          setHeadingIndex(0);
          setTypedText(headings[0].dynamic);
          setLoopCompleted(true);
        } else {
          setHeadingIndex((prev) => prev + 1);
          setCharIndex(0);
          setTypedText("");
        }
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, headingIndex, loopCompleted, headings]);
  return (
    <>
      <div className=" text-[14px] text-white lg:text-2xl dark:text-gray-100 md:text-xl font-semibold  text-center mt-4 ">
        {headings[headingIndex].static}{" "}
        <span>
          {typedText}
          {!loopCompleted && (
            <span className=" border-gray-800 animate-pulse ml-1"></span>
          )}
        </span>
      </div>
    </>
  );
};

export default DynamicText;
