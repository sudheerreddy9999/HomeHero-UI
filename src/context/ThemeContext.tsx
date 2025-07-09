import { createContext, useContext, useEffect, useState } from "react";

type Mode = "Light" | "Dark" | "System Default";

interface ThemeContextType {
  isDarkMode: boolean;
  isSystemDefault: boolean;
  toggleMode: (mode: Mode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSystemDefault, setIsSystemDefault] = useState(false);
  useEffect(() => {
    const storedTheme = JSON.parse(localStorage.getItem("theme") || '{}');
    if (storedTheme?.Theme === "Dark") {
      setIsDarkMode(true);
    } else if (storedTheme?.Theme === "Light") {
      setIsDarkMode(false);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      localStorage.setItem(
        "theme",
        JSON.stringify({ Theme: prefersDark ? "Dark" : "Light", system: "true" })
      );
      setIsSystemDefault(true);
    }
  }, []);

  const toggleMode = (mode: Mode) => {
    if( mode === "System Default") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;   
        setIsDarkMode(prefersDark);
        setIsSystemDefault(true);
        localStorage.setItem("theme", JSON.stringify({ Theme: mode, system: "true" }));
        return;
    }
    setIsDarkMode(mode === "Dark");
    setIsSystemDefault(false)
    localStorage.setItem("theme", JSON.stringify({ Theme: mode, system: "false" }));
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode,isSystemDefault, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
