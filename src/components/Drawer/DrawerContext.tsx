import { createContext, useContext } from "react";

interface DrawerContextType {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const DrawerContext = createContext<DrawerContextType>({
  isOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
});

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error(
      "useDrawer는 반드시 DrawerProvider 내부에서 사용되어야 합니다."
    );
  }

  return context;
};
