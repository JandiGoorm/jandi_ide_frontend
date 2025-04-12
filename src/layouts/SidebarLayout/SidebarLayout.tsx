/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import clsx from "clsx";
import React, { createContext, useCallback, useState } from "react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import styles from "./SidebarLayout.module.css";

interface SidebarContextValue {
  isOpen: boolean;
  toggleSidebar: () => void;
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
}
// Sidebar의 상태를 관리하고 하위 컴포넌트에 전달하는 Provider 입니다.
const Provider = ({ children }: SidebarLayoutProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <SidebarContext.Provider
      value={{ isOpen, toggleSidebar: handleToggleSidebar }}
    >
      <div className={styles.sidebar_layout}>{children}</div>
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
  const { isOpen } = useSidebar();

  return (
    <motion.div
      className={clsx(className)}
      animate={{
        width: isOpen ? 350 : 80,
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

interface ContentProps extends React.HTMLProps<HTMLDivElement> {
  header?: React.ReactNode;
}

// 콘텐츠를 나타내는 컴포넌트입니다. (오른쪽 콘텐츠 영역)
const Content = ({ className, header, children, ...props }: ContentProps) => {
  return (
    <div className={clsx(styles.content, className)} {...props}>
      <div className={styles.main_content}>
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
};
