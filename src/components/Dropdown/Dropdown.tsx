import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  CSSProperties,
  ReactNode,
  ForwardedRef,
} from "react";
import { DropdownContext, useDropdown } from "./DropdownContext";
import { createPortal } from "react-dom";
import styles from "./DropDown.module.css";

interface DropdownProps {
  children: ReactNode;
  style?: CSSProperties;
  dropdownRef?: ForwardedRef<{ close: () => void }>;
}

interface Position {
  top: number;
  left: number;
}

const Dropdown = ({
  children,
  style = {},
  dropdownRef = null,
}: DropdownProps) => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClickTrigger = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  useImperativeHandle(
    dropdownRef,
    () => ({
      close,
    }),
    [close]
  );

  const updatePosition = useCallback(() => {
    if (!ref.current || !contentRef.current || !isVisible) return;

    const triggerRect = ref.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();

    const viewportWidth = window.innerWidth;

    const top = triggerRect.bottom + window.scrollY;
    let left = triggerRect.right + window.scrollX;

    if (viewportWidth - triggerRect.right < contentRect.width) {
      left = triggerRect.left - contentRect.width + window.scrollX;
    }

    setPosition({ top, left });
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      return () => {
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isVisible, updatePosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !contentRef.current?.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownContext.Provider
      value={{
        onClick: handleClickTrigger,
        isVisible,
        close,
        contentRef,
        position,
      }}
    >
      <div className={styles.container} ref={ref} style={style}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

interface TriggerProps {
  children: ReactNode;
  style?: CSSProperties;
}

const DropdownTrigger = ({ children, style = {} }: TriggerProps) => {
  const { onClick } = useDropdown();

  return (
    <div onClick={onClick} className={styles.trigger} style={style}>
      {children}
    </div>
  );
};

interface DropdownContentProps {
  children: ReactNode;
}

const DropdownContent = ({ children }: DropdownContentProps) => {
  const { isVisible, contentRef, position } = useDropdown();

  if (!isVisible) return null;

  return createPortal(
    <div
      ref={contentRef}
      className={styles.content}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {children}
    </div>,
    document.body
  );
};

export { Dropdown, DropdownTrigger, DropdownContent };
