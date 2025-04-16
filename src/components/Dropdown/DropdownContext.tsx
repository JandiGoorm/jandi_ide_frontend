import { createContext, useContext, RefObject } from "react";

interface DropdownContextType {
  onClick: (e: React.MouseEvent) => void;
  isVisible: boolean;
  close: () => void;
  contentRef: RefObject<HTMLDivElement | null>;
  position: { top: number; left: number };
}

export const DropdownContext = createContext<DropdownContextType | null>(null);

export const useDropdown = (): DropdownContextType => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      "useDropdown은 반드시 DropDownProvider 내부에서 사용되어야 합니다."
    );
  }

  return context;
};
