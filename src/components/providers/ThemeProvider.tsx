"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => null,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme) || "dark";
    setTheme(savedTheme);
    
    const applyTheme = (currentTheme: Theme) => {
      if (currentTheme === "dark") {
        document.documentElement.classList.remove("light");
      } else if (currentTheme === "light") {
        document.documentElement.classList.add("light");
      } else if (currentTheme === "system") {
        const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (isSystemDark) {
          document.documentElement.classList.remove("light");
        } else {
          document.documentElement.classList.add("light");
        }
      }
    };

    applyTheme(savedTheme);

    // Listen for system theme changes if set to system
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (localStorage.getItem("theme") === "system") {
        applyTheme("system");
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.remove("light");
    } else if (newTheme === "light") {
      document.documentElement.classList.add("light");
    } else if (newTheme === "system") {
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isSystemDark) {
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
