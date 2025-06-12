"use client";

import React, { useState, useEffect } from "react";
import ThemeLight from "@/assets/theme.png";
import ThemeDark from "@/assets/theme-dark.png";
import Image from "@/components/Image/image"
import { IoClose, IoSunny, IoMoonSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

type Mode = "Light" | "Dark" | "System Default";

const ModeToggleSwitch = () => {
  const [currentMode, setCurrentMode] = useState<Mode>("Light");
  const [hasMounted, setHasMounted] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleToggleChange = (value: Mode) => {
    setCurrentMode(value);
    localStorage.setItem("theme", value);
    setOpenModal(!openModal);
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (["Light", "Dark", "System Default"].includes(saved ?? "")) {
      setCurrentMode(saved as Mode);
    }
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (currentMode === "Dark") {
      root.classList.add("dark");
    } else if (currentMode === "Light") {
      root.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      root.classList.toggle("dark", prefersDark);
    }
  }, [currentMode]);



  if (!hasMounted) return null;

  return (
    <>
      <div className="relative group inline-block">
        <Image
          onClick={() => setOpenModal(!openModal)}
          alt="Image"
          src={currentMode === "Dark" ? ThemeDark : ThemeLight}
          className="size-6 cursor-pointer text-white hover:-translate-y-0.5 transition-transform lg:mt-1.5"
        />
        <div className="absolute left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block bg-gray-200 text-black text-xs px-2 py-1.5 rounded shadow-md z-[999]">
          Theme
        </div>
      </div>

      <AnimatePresence>
        {openModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0  w-full z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs "
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-center items-start w-xs shadow-2xs rounded-[10px] bg-gray-100 p-3"
            >
              <div className="w-full flex justify-end">
                <IoClose
                  className="cursor-pointer text-3xl text-gray-700 hover:text-black transition"
                  onClick={() => setOpenModal(false)}
                />
              </div>

              {["Light", "Dark", "System Default"].map((mode, index) => (
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-3 py-4 border-b text-gray-700 w-full last:border-b-0"
                >
                  <label className="text-[16px] flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      value={mode}
                      checked={currentMode === mode}
                      onChange={(e) =>
                        handleToggleChange(e.target.value as Mode)
                      }
                      className="scale-125 accent-black cursor-pointer"
                    />
                    {mode === "Light" && (
                      <IoSunny className="text-yellow-500" />
                    )}
                    {mode === "Dark" && <IoMoonSharp className="text-black" />}
                    {mode}
                  </label>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModeToggleSwitch;
