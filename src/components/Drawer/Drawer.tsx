import { cloneElement, ReactNode, useCallback, useState } from "react";
import styles from "./Drawer.module.css";
import { DrawerContext, useDrawer } from "./DrawerContext";
import Button from "../Button/Button";
import { AnimatePresence, motion } from "framer-motion";

// Drawer 컴포넌트
interface DrawerProps {
  children: ReactNode;
}

const Drawer = ({ children }: DrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <DrawerContext.Provider
      value={{
        isOpen,
        openDrawer,
        closeDrawer,
      }}
    >
      <>{children}</>
    </DrawerContext.Provider>
  );
};

// DrawerTrigger 컴포넌트
interface DrawerTriggerProps {
  children: React.ReactElement<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >;
}

const DrawerTrigger = ({ children }: DrawerTriggerProps) => {
  const { openDrawer } = useDrawer();

  return cloneElement(children, {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      if (children.props.onClick) {
        children.props.onClick?.(event);
      }
      openDrawer();
    },
  });
};

// DrawerContent 컴포넌트
interface DrawerContentProps {
  children: ReactNode;
}

const DrawerContent = ({ children }: DrawerContentProps) => {
  const { isOpen, closeDrawer } = useDrawer();

  const variants = {
    hidden: {
      x: "-100%",
      opacity: 0.5,
    },
    visible: {
      x: "0",
      opacity: 1,
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className={styles.container}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
        >
          <Button
            onClick={closeDrawer}
            variant="none"
            style={{ position: "absolute", top: "1rem", right: "1rem" }}
          >
            x
          </Button>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Drawer, DrawerTrigger, DrawerContent };
