import {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { ToastContext, Toast, CreateToastParams } from "./ToastContext";

const MAX_TOASTS_LENGTH = 3;

interface ToastProviderProps {
  children: ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const deleteToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));

    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
  }, []);

  const createToast = useCallback(
    ({ type, text }: CreateToastParams) => {
      const id = Date.now().toString(); // ID를 string으로 통일

      const toast: Toast = { id, type, text };

      setToasts((prevToasts) => {
        const newToasts = [...prevToasts, toast];
        if (newToasts.length > MAX_TOASTS_LENGTH) {
          const [first] = newToasts;
          deleteToast(first.id);
        }
        return newToasts;
      });

      const timer = setTimeout(() => {
        deleteToast(id);
      }, 1000);

      timersRef.current[id] = timer;
    },
    [deleteToast]
  );

  useEffect(() => {
    const timers = timersRef.current;

    return () => {
      Object.values(timers).forEach(clearTimeout);
    };
  }, []);

  const value = useMemo(() => ({ createToast, toasts }), [createToast, toasts]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export default ToastProvider;
