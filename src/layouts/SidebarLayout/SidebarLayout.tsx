/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import clsx from "clsx";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import styles from "./SidebarLayout.module.css";

interface SidebarContextValue {
  isOpen: boolean;
  toggleSidebar: () => void;
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
  minWidth: number;
  maxWidth: number;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error(
      "useSidebar는 반드시 SidebarProvider 내부에서 사용해야 합니다."
    );
  }
  return context;
};

interface SidebarLayoutProps {
  children?: React.ReactNode;
  className?: string;
  minWidth?: number;
  maxWidth?: number;
}
// Sidebar의 상태를 관리하고 하위 컴포넌트에 전달하는 Provider 입니다.
const Provider = ({
  children,
  className = styles.default_layout,
  minWidth = 80,
  maxWidth = 500,
}: SidebarLayoutProps) => {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth > 768);
  const [sidebarWidth, setSidebarWidth] = useState(350);

  const handleToggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        toggleSidebar: handleToggleSidebar,
        sidebarWidth,
        setSidebarWidth,
        minWidth,
        maxWidth,
      }}
    >
      <div className={clsx(styles.sidebar_layout, className)}>{children}</div>
    </SidebarContext.Provider>
  );
};

interface SidebarToggleButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children?: ((isOpen: boolean) => React.ReactNode) | React.ReactNode;
}
// Sidebar의 토글 버튼을 나타내는 컴포넌트입니다.
const ToggleButton = ({
  children,
  className,
  ...props
}: SidebarToggleButtonProps) => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <button onClick={toggleSidebar} className={clsx(className)} {...props}>
      {typeof children === "function" ? children(isOpen) : children}
    </button>
  );
};

interface SidebarProps extends HTMLMotionProps<"div"> {}
// Sidebar의 패널을 나타내는 컴포넌트입니다. (왼쪽 사이드바 영역)
const Panel = ({ className, children, ...props }: SidebarProps) => {
  const { isOpen, sidebarWidth } = useSidebar();

  return (
    <motion.div
      className={clsx(className)}
      animate={{
        width: isOpen ? sidebarWidth : 80,
      }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      <AnimatePresence mode="wait" key={isOpen ? "open" : "closed"}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            {children}
          </motion.div>
        )}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// 사이드바와 콘텐츠 사이의 리사이저 컴포넌트
const Resizer = () => {
  const { isOpen, setSidebarWidth, minWidth, maxWidth } = useSidebar();
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isOpen) return;
    setIsDragging(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newWidth = Math.max(minWidth, Math.min(maxWidth, e.clientX));
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, setSidebarWidth, minWidth, maxWidth]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.resizer}
      onMouseDown={handleMouseDown}
      style={{ cursor: isDragging ? "col-resize" : "ew-resize" }}
    />
  );
};

interface ContentProps extends React.HTMLProps<HTMLDivElement> {
  header?: React.ReactNode;
  fullWidth?: boolean;
}

// 콘텐츠를 나타내는 컴포넌트입니다. (오른쪽 콘텐츠 영역)
const Content = ({
  className,
  header,
  children,
  fullWidth,
  ...props
}: ContentProps) => {
  const { isOpen } = useSidebar();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isHidden = windowWidth <= 700 && isOpen;

  if (isHidden) return null;

  return (
    <div className={clsx(styles.content, className)} {...props}>
      <div
        className={clsx(styles.main_content, fullWidth && styles.full_width)}
      >
        {header}
        {children}
      </div>
    </div>
  );
};

export const Sidebar = {
  Provider,
  Panel,
  ToggleButton,
  Content,
  Resizer,
};
