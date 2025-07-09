import { useState,useEffect } from "react";

export default function useCurrentMode() {
  const [isThemeDark, setIsDarkMode] = useState(false);

 useEffect(() => {
  const storedTheme = JSON.parse(localStorage.getItem("theme") || '{}');

  if (storedTheme.Theme === "Dark") {
    setIsDarkMode(true);
  } else if (storedTheme.Theme === "Light") {
    setIsDarkMode(false);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDark);

    localStorage.setItem(
      "theme",
      JSON.stringify({ Theme: prefersDark ? "Dark" : "Light", system: "true" })
    );
  }
}, []);


  return isThemeDark;
}