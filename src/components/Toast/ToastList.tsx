import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "../../contexts/ToastContext";
import { BsExclamationCircleFill } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import styles from "./ToastList.module.css";
import { ReactElement } from "react";

type ToastType = "success" | "error";

interface Toast {
  id: string;
  type: ToastType;
  text: string;
}

const toastVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const ToastList: React.FC = () => {
  const { toasts } = useToast() as { toasts: Toast[] };

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {toasts.map((toast) => {
          const { id, type, text } = toast;
          const toastStyles = styles[`toast_item_${type}`];
          const icon: Record<ToastType, ReactElement> = {
            success: <FaCircleCheck />,
            error: <BsExclamationCircleFill />,
          };

          return (
            <motion.div
              key={id}
              className={`${styles.toast_item} ${toastStyles}`}
              variants={toastVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className={styles.title}>
                {icon[type]}
                <p>{text}</p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ToastList;
