import { ReactNode } from "react";
import useDarkMode from "../hooks/useDarkmode";
import { DarkModeContext } from "./DarkmodeContext";

interface DarkModeProviderProps {
  children: ReactNode;
}

const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  const { toggleDarkMode, isDarkMode } = useDarkMode();

  return (
    <DarkModeContext.Provider value={{ toggleDarkMode, isDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
