import { cloneElement, useCallback, useState } from "react";
import { MdClose } from "react-icons/md";
import styles from "./Modal.module.css";
import { ModalContext, useModal } from "./ModalContext";

// 1. Modal 컴포넌트
interface ModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

interface ModalTriggerProps {
  children: React.ReactElement<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >;
  onOpen?: () => void;
}

const ModalTrigger = ({ children, onOpen }: ModalTriggerProps) => {
  const { openModal } = useModal();

  return cloneElement(children, {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      const childOnClick = children.props.onClick as
        | ((event: React.MouseEvent<HTMLButtonElement>) => void)
        | undefined;

      childOnClick?.(event);
      event.stopPropagation();
      openModal();
      onOpen?.();
    },
  });
};

interface ModalContentProps {
  children: React.ReactElement;
}

const ModalContent = ({ children }: ModalContentProps) => {
  const { isOpen, closeModal } = useModal();
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {isOpen && (
        <>
          <div
            className={styles.backdrop}
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
          />
          <div className={styles.container} onClick={handleContainerClick}>
            <MdClose onClick={closeModal} className={styles.close} size={24} />
            <div className={styles.modal_content}>{children}</div>
          </div>
        </>
      )}
    </>
  );
};

export { Modal, ModalContent, ModalTrigger };
