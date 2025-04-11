import { createContext, useContext } from "react";

interface DarkModeContextType {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

export const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

export const useDarkModeContext = (): DarkModeContextType => {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error(
      "useDarkModeContext 는 DarkModeProvider 내부에서 사용되어야 합니다."
    );
  }

  return context;
};
