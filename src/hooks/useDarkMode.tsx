import { useState, useEffect, useCallback } from "react";

const LOCAL_STORAGE_KEY = "mode";

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const isDark = localStorage.getItem(LOCAL_STORAGE_KEY) === "dark";
      return isDark;
    }
    return true;
  });

  const toggleDarkMode = useCallback((): void => {
    setIsDarkMode((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("theme", "dark");
      localStorage.setItem(LOCAL_STORAGE_KEY, "dark");
    } else {
      document.documentElement.setAttribute("theme", "light");
      localStorage.setItem(LOCAL_STORAGE_KEY, "light");
    }
  }, [isDarkMode]);

  return { toggleDarkMode, isDarkMode };
};

export default useDarkMode;
