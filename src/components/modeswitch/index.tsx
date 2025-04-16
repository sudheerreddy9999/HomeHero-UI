"use client";

import React, { useState, useEffect } from "react";
import { IoSunny } from "react-icons/io5";
import { IoMoonSharp } from "react-icons/io5";

type Mode = "Light" | "Dark";
const ModeToggleSwitch = () => {
  const [currentMode, setCurrentMode] = useState<Mode>("Light");
  const [hasMounted,setHasMounted] = useState<boolean>(false);
  const handleToggleChange = (value: Mode) => {
    setCurrentMode(value);
    localStorage.setItem("theme",value);
  };
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Mode;
    if (savedTheme) {
      setCurrentMode(savedTheme);
    }
    setHasMounted(true);
  },[]);
  useEffect(() => {
    const root = window.document.documentElement;
    if (currentMode == "Dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [currentMode]);
  if(!hasMounted) return null
  return (
    <>
      <button className="w-24 h-9 flex justify-between items-center border-[1px] border-gray-900 rounded-4xl px-3 cursor-pointer">
        <div
          className={` ${
            currentMode == "Light" && "bg-gray-100"
          } group relative  p-1.5 rounded-3xl`}
          onClick={() => handleToggleChange("Light")}
        >
          <IoSunny
            size={16}
            className={` ${
              currentMode == "Light" ? "text-amber-500" : "text-gray-100"
            }`}
          />
          <div className="absolute hidden group-hover:block -translate-x-1/4 translate-y-7/12 px-4 py-1 bg-gray-200 rounded-sm text-sm">
            Light
          </div>
        </div>
        <div
          className={` ${
            currentMode == "Dark" && "bg-gray-800"
          } p-1.5 relative group rounded-3xl`}
          onClick={() => handleToggleChange("Dark")}
        >
          <IoMoonSharp
            size={15}
            className={` ${
              currentMode == "Dark" ? "text-gray-100" : "text-gray-800"
            }`}
          />
          <div className="absolute hidden group-hover:block -translate-x-1/4 translate-y-7/12 px-4 py-1 bg-gray-200 rounded-sm text-sm">
            Dark
          </div>
        </div>
      </button>
    </>
  );
};
export default ModeToggleSwitch;
