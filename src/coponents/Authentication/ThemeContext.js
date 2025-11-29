// src/context/ThemeContext.js
import React, { createContext, useEffect, useState, useMemo } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("userTheme") || "auto";
  });

  const currentTheme = useMemo(() => {
    if (theme === "auto") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return theme;
  }, [theme]);

  const applyTheme = (selectedTheme) => {
    const actualTheme = selectedTheme === "auto" 
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : selectedTheme;

    console.log("🎨 Applying theme:", { selectedTheme, actualTheme });

    // Apply to document element
    document.documentElement.setAttribute("data-theme", actualTheme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", actualTheme === "dark" ? "#121212" : "#ffffff");
    }
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (theme !== "auto") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e) => {
      console.log("🔄 System theme changed to:", e.matches ? "dark" : "light");
      applyTheme("auto");
    };
    
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [theme]);

  const updateTheme = (newTheme) => {
    console.log("🎯 Theme update requested:", newTheme);
    setTheme(newTheme);
    localStorage.setItem("userTheme", newTheme);
    applyTheme(newTheme);
  };

  const themeInfo = useMemo(() => ({
    theme,
    currentTheme,
    updateTheme,
    isDark: currentTheme === "dark",
    isLight: currentTheme === "light",
    isAuto: theme === "auto"
  }), [theme, currentTheme]);

  return (
    <ThemeContext.Provider value={themeInfo}>
      {children}
    </ThemeContext.Provider>
  );
};